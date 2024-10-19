import { UseCaseError } from './usecase-error'

export class ResourceAlreadyExistsError extends Error implements UseCaseError {
  constructor(resource: string) {
    super(`${resource} already exists.`)
  }
}
