type TokenType = 'refresh' | 'access'

export class InvalidTokenException extends Error {
  constructor(tokenType: TokenType) {
    super(`Invalid ${tokenType} token.`)
  }
}
