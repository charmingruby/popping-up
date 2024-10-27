import { Either } from '@/common/core/either'
import { EntityValidationException } from '@/common/core/exceptions/entity-validation.exception'
import { NothingToChangeException } from '@/common/core/exceptions/nothing-to-change.exception'
import { ResourceNotFoundException } from '@/common/core/exceptions/resource-not-found.exception'

export interface ManageCollectableStateParams {
  collectableId: string
  ownerId: string
  url: string
  status: string
}

export type ManageCollectableStateResult = Either<
  | ResourceNotFoundException
  | NothingToChangeException
  | EntityValidationException,
  null
>

export abstract class ManageCollectableStateGateway {
  abstract perform(
    params: ManageCollectableStateParams,
  ): Promise<ManageCollectableStateResult>
}
