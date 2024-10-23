import { Either } from '@/common/core/either'
import { ResourceAlreadyExistsException } from '@/common/core/exceptions/resource-already-exists.exception'


import { ResourceNotFoundException } from '@/common/core/exceptions/resource-not-found.exception'

export interface CreateCollectableParams {
  collectableName: string
  collectableDescription: string
  collectableCollectionId: string
  referenceTitle: string
  referenceObservation: string
  referenceUrl: string
  referencePriceInCents: number
}

export type CreateCollectableResult = Either<
  ResourceNotFoundException | ResourceAlreadyExistsException,
  null
>

export abstract class CreateCollectableGateway {
  abstract perform(
    params: CreateCollectableParams,
  ): Promise<CreateCollectableResult>
}
