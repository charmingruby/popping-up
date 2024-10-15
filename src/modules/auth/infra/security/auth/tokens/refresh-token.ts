export interface RefreshToken {
  id: string
  accountId: string
  issuedAt: Date
  expiresAt: Date
  createdAt: Date
}

export abstract class RefreshTokenRepository {
  abstract create(token: RefreshToken): Promise<void>
  abstract findById(id: string): Promise<RefreshToken | null>
  abstract findByAccountId(accountId: string): Promise<RefreshToken | null>
  abstract deleteById(id: string): Promise<void>
}
