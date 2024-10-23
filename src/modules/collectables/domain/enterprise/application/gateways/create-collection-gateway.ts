import { Either } from '@/common/core/either'
import { ResourceAlreadyExistsException } from '@/common/core/exceptions/resource-already-exists.exception'


import { ResourceNotFoundException } from '@/common/core/exceptions/resource-not-found.exception'

export interface CreateCollectionParams {
  name: string
  ownerId: string
  theme: string
  description: string
}

export type CreateCollectionResult = Either<
  ResourceNotFoundException | ResourceAlreadyExistsException,
  null
>

export abstract class CreateCollectionGateway {
  abstract perform(
    params: CreateCollectionParams,
  ): Promise<CreateCollectionResult>
}
