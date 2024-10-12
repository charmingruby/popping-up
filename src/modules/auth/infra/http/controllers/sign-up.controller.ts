import { Body, Controller, Post } from '@nestjs/common'

import { AccountsRepository } from '@/modules/auth/domain/application/repositories/accounts-repository'

import { SignUpDto } from '../dto/sign-up.dto'

@Controller()
export class SignUpController {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  @Post('/auth/signup')
  async signUp(@Body() dto: SignUpDto) {
    return { dto }
  }
}
