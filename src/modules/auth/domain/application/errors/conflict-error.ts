import { UseCaseError } from '@/common/core/errors/usecase-error'

export class ConflictError extends Error implements UseCaseError {
  constructor(field: string) {
    super(`${field} already exists`)
  }
}
