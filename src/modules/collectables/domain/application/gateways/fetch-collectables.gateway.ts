import { Either } from '@/common/core/either'

import { Collectable } from '../../enterprise/entities/collectable.entity'

export interface FetchCollectablesParams {
  ownerId: string
  collectionId: string
}

export type FetchCollectablesResult = Either<null, Collectable[]>

export abstract class FetchCollectablesGateway {
  abstract perform(
    params: FetchCollectablesParams,
  ): Promise<FetchCollectablesResult>
}
