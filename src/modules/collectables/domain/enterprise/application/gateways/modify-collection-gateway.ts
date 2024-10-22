import { Either } from '@/common/core/either'
import { NothingToChangeError } from '@/common/core/errors/nothing-to-change-error'
import { ResourceAlreadyExistsError } from '@/common/core/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@/common/core/errors/resource-not-found-error'

export interface ModifyCollectionParams {
  ownerId: string
  collectionId: string
  name: string
  theme: string
  description: string
}

export type ModifyCollectionResult = Either<
  ResourceNotFoundError | ResourceAlreadyExistsError | NothingToChangeError,
  null
>

export abstract class ModifyCollectionGateway {
  abstract perform(
    params: ModifyCollectionParams,
  ): Promise<ModifyCollectionResult>
}
