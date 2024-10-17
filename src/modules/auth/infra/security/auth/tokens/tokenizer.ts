import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import {
  ACCESS_TOKEN_EXPIRATION_TIME_IN_MINUTES,
  REFRESH_TOKEN_EXPIRATION_TIME_IN_DAYS,
} from '@/common/constants/token-expiration-time'
import { Either, left, right } from '@/common/core/either'
import { Identifier } from '@/common/core/entities/identifier'
import { AccountPayload } from '@/modules/auth/domain/application/logic/account-payload'
import { AccountsRepository } from '@/modules/auth/domain/application/repositories/accounts-repository'

import { InvalidTokenError } from './errors/invalid-token-error'
import { RefreshToken, RefreshTokenRepository } from './refresh-token'

export type RefreshTokenResult = Either<
  Error | InvalidTokenError,
  { accessToken: string; refreshToken: string }
>

@Injectable()
export class Tokenizer {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly refreshTokensRepository: RefreshTokenRepository,
    private readonly accountsRepository: AccountsRepository,
  ) {}

  async performTokensGeneration(
    payload: AccountPayload,
  ): Promise<RefreshTokenResult> {
    try {
      const refreshTokenAlreadyExists =
        await this.refreshTokensRepository.findByAccountId(payload.accountId)

      if (refreshTokenAlreadyExists) {
        await this.refreshTokensRepository.deleteById(
          refreshTokenAlreadyExists.id,
        )
      }

      const accessToken = await this.generateAccessToken(payload)
      const refreshToken = await this.generateRefreshToken(payload)

      this.refreshTokensRepository.create(refreshToken)

      return right({ accessToken, refreshToken: refreshToken.id })
    } catch (err) {
      return left(err)
    }
  }

  async performTokensRotation(
    refreshTokenId: string,
  ): Promise<RefreshTokenResult> {
    try {
      const refreshToken =
        await this.refreshTokensRepository.findById(refreshTokenId)
      if (!refreshToken) {
        return left(new InvalidTokenError('refresh'))
      }

      await this.refreshTokensRepository.deleteById(refreshTokenId)

      if (Date.now() > refreshToken.expiresAt.getTime()) {
        return left(new InvalidTokenError('refresh'))
      }

      const account = await this.accountsRepository.findById(
        refreshToken.accountId,
      )

      const payload = {
        accountId: account.id,
        email: account.email,
        username: account.username,
      }

      const accessToken = await this.generateAccessToken(payload)
      const newRefreshToken = await this.generateRefreshToken(payload)

      await this.refreshTokensRepository.create(refreshToken)

      return right({ accessToken, refreshToken: newRefreshToken.id })
    } catch (err) {
      return left(err)
    }
  }

  private async generateAccessToken(payload: AccountPayload) {
    return await this.jwtService.signAsync(
      {
        sub: payload.accountId,
        payload: {
          email: payload.email,
          username: payload.username,
        },
      },
      {
        secret: this.configService.get('JWT_SECRET_KEY'),
        expiresIn: `${ACCESS_TOKEN_EXPIRATION_TIME_IN_MINUTES}m`,
      },
    )
  }

  private async generateRefreshToken(payload: AccountPayload) {
    const expiresAt = new Date()
    expiresAt.setDate(
      expiresAt.getDate() + REFRESH_TOKEN_EXPIRATION_TIME_IN_DAYS,
    )

    const refreshToken: RefreshToken = {
      id: new Identifier().toString,
      accountId: payload.accountId,
      expiresAt,
      issuedAt: new Date(),
      createdAt: new Date(),
    }

    return refreshToken
  }
}
