import { Either } from '@/common/core/either'
import { ResourceAlreadyExistsError } from '@/common/core/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@/common/core/errors/resource-not-found-error'

export interface CreateCollectionParams {
  name: string
  ownerId: string
  theme: string
  description: string
}

export type CreateCollectionResult = Either<
  ResourceNotFoundError | ResourceAlreadyExistsError,
  null
>

export abstract class CreateCollectionGateway {
  abstract perform(
    params: CreateCollectionParams,
  ): Promise<CreateCollectionResult>
}
