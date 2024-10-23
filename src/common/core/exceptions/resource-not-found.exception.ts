import { UseCaseException } from './usecase.exception'

export class ResourceNotFoundException
  extends Error
  implements UseCaseException
{
  constructor(resource: string) {
    super(`${resource} not found.`)
  }
}
