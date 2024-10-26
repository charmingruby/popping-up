import { UseCaseException } from './usecase.exception'

export class EntityValidationException
  extends Error
  implements UseCaseException
{
  constructor(msg: string) {
    super(msg)
  }
}
