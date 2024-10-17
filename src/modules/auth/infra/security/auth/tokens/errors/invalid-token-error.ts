type TokenType = 'refresh' | 'access'

export class InvalidTokenError extends Error {
  constructor(tokenType: TokenType) {
    super(`Invalid ${tokenType} token.`)
  }
}
