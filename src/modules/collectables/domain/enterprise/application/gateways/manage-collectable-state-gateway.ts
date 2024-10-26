import { Either } from '@/common/core/either'
import { NothingToChangeException } from '@/common/core/exceptions/nothing-to-change.exception'
import { ResourceNotFoundException } from '@/common/core/exceptions/resource-not-found.exception'

export interface ManageCollectableStateParams {
  collectableId: string
  ownerId: string
  url: string
  status: string
}

export type ManageCollectableStateResult = Either<
  ResourceNotFoundException | NothingToChangeException,
  null
>

export abstract class ManageCollectableStateGateway {
  abstract perform(
    params: ManageCollectableStateParams,
  ): Promise<ManageCollectableStateResult>
}
