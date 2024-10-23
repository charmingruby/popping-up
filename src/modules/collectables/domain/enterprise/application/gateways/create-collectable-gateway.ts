import { Either } from '@/common/core/either'
import { ResourceAlreadyExistsError } from '@/common/core/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@/common/core/errors/resource-not-found-error'

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
  ResourceNotFoundError | ResourceAlreadyExistsError,
  null
>

export abstract class CreateCollectableGateway {
  abstract perform(
    params: CreateCollectableParams,
  ): Promise<CreateCollectableResult>
}
