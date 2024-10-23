import { UseCaseException } from './usecase.exception'

export class ResourceAlreadyExistsException
  extends Error
  implements UseCaseException
{
  constructor(resource: string) {
    super(`${resource} already exists.`)
  }
}
