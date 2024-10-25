import { Either } from '@/common/core/either'
import { ResourceNotFoundException } from '@/common/core/exceptions/resource-not-found.exception'

import { Collectable } from '../../entities/collectable'

export interface GetCollectableParams {
  collectableId: string
  collectionId: string
}

export type GetCollectableResult = Either<
  ResourceNotFoundException,
  Collectable
>

export abstract class GetCollectableGateway {
  abstract perform(params: GetCollectableParams): Promise<GetCollectableResult>
}
