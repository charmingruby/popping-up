import { UseCaseException } from './usecase.exception'

export class ConflictException extends Error implements UseCaseException {
  constructor(field: string) {
    super(`${field} already exists`)
  }
}
