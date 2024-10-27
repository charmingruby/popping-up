import { Either } from '@/common/core/either'

import { Collection } from '../../enterprise/entities/collection.entity'

export interface FetchCollectionsParams {
  ownerId: string
}

export type FetchCollectionsResult = Either<null, Collection[]>

export abstract class FetchCollectionsGateway {
  abstract perform(
    params: FetchCollectionsParams,
  ): Promise<FetchCollectionsResult>
}
