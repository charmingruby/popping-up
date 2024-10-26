import { Either } from '@/common/core/either'
import { NothingToChangeException } from '@/common/core/exceptions/nothing-to-change.exception'
import { ResourceAlreadyExistsException } from '@/common/core/exceptions/resource-already-exists.exception'
import { ResourceNotFoundException } from '@/common/core/exceptions/resource-not-found.exception'

export interface ModifyCollectionParams {
  ownerId: string
  collectionId: string
  name: string
  theme: string
  description: string
}

export type ModifyCollectionResult = Either<
  | ResourceNotFoundException
  | ResourceAlreadyExistsException
  | NothingToChangeException,
  null
>

export abstract class ModifyCollectionGateway {
  abstract perform(
    params: ModifyCollectionParams,
  ): Promise<ModifyCollectionResult>
}
