import { UseCaseError } from './usecase-error'

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor(resource: string) {
    super(`${resource} not found.`)
  }
}
