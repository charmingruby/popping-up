import { UseCaseError } from '@/core/errors/usecase-error'

export class InvalidCredentialsError extends Error implements UseCaseError {
  constructor() {
    super('invalid credentials')
  }
}
