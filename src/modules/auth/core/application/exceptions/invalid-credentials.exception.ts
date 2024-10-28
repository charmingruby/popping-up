import { UseCaseException } from '@/common/core/exceptions/usecase.exception'

export class InvalidCredentialsException
  extends Error
  implements UseCaseException
{
  constructor() {
    super('invalid credentials')
  }
}
