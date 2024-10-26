import { Either } from '@/common/core/either'
import { ResourceNotFoundException } from '@/common/core/exceptions/resource-not-found.exception'

import { Collection } from '../../enterprise/entities/collection'

export interface GetCollectionParams {
  collectionId: string
  ownerId: string
}

export type GetCollectionResult = Either<ResourceNotFoundException, Collection>

export abstract class GetCollectionGateway {
  abstract perform(params: GetCollectionParams): Promise<GetCollectionResult>
}
