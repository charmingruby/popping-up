import { Either } from '@/common/core/either'
import { ConflictError } from '@/common/core/errors/conflict-error'
import { ResourceNotFoundError } from '@/common/core/errors/resource-not-found-error'

export interface CreateCollectionParams {
  name: string
  ownerId: string
  theme: string
  description: string
}

export type CreateCollectionResult = Either<
  ResourceNotFoundError | ConflictError,
  CreateCollectionParams
>

export abstract class CreateCollectionGateway {
  abstract perform(
    params: CreateCollectionParams,
  ): Promise<CreateCollectionResult>
}
