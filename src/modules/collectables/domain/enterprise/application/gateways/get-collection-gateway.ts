import { Either } from '@/common/core/either'
import { ResourceNotFoundError } from '@/common/core/errors/resource-not-found-error'

import { Collection } from '../../entities/collection'

export interface GetCollectionParams {
  collectionId: string
  ownerId: string
}

export type GetCollectionResult = Either<ResourceNotFoundError, Collection>

export abstract class GetCollectionGateway {
  abstract perform(params: GetCollectionParams): Promise<GetCollectionResult>
}
