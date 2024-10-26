import { Either } from '@/common/core/either'
import { ResourceNotFoundException } from '@/common/core/exceptions/resource-not-found.exception'

import { Collection } from '../../enterprise/entities/collection'

export interface FetchCollectionsParams {
  ownerId: string
}

export type FetchCollectionsResult = Either<
  ResourceNotFoundException,
  Collection[]
>

export abstract class FetchCollectionsGateway {
  abstract perform(
    params: FetchCollectionsParams,
  ): Promise<FetchCollectionsResult>
}
