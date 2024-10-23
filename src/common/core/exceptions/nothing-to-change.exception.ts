import { UseCaseException } from './usecase.exception'

export class NothingToChangeException
  extends Error
  implements UseCaseException
{
  constructor() {
    super(`nothing to change.`)
  }
}
