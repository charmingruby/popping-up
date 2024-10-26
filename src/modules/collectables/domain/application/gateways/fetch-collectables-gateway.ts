import { Either } from '@/common/core/either'
import { ResourceNotFoundException } from '@/common/core/exceptions/resource-not-found.exception'

import { Collectable } from '../../enterprise/entities/collectable'

export interface FetchCollectablesParams {
  ownerId: string
  collectionId: string
}

export type FetchCollectablesResult = Either<
  ResourceNotFoundException,
  Collectable[]
>

export abstract class FetchCollectablesGateway {
  abstract perform(
    params: FetchCollectablesParams,
  ): Promise<FetchCollectablesResult>
}
