import { UseCaseError } from './usecase-error'

export class NothingToChangeError extends Error implements UseCaseError {
  constructor() {
    super(`nothing to change.`)
  }
}
