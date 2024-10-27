import { left, right } from '@/common/core/either'
import { EntityValidationException } from '@/common/core/exceptions/entity-validation.exception'
import { NothingToChangeException } from '@/common/core/exceptions/nothing-to-change.exception'
import { ResourceNotFoundException } from '@/common/core/exceptions/resource-not-found.exception'

import { CollectableStatus } from '../../enterprise/entities/collectable.entity'
import {
  ManageCollectableStateGateway,
  ManageCollectableStateParams,
  ManageCollectableStateResult,
} from '../gateways/manage-collectable-state.gateway'
import { CollectablesRepository } from '../repositories/collectables.repository'
import { ReferencesRepository } from '../repositories/references.repository'

export class ManageCollectableStateUseCase
  implements ManageCollectableStateGateway
{
  constructor(
    private readonly collectablesRepository: CollectablesRepository,
    private readonly referencesRepository: ReferencesRepository,
  ) {}

  async perform(
    params: ManageCollectableStateParams,
  ): Promise<ManageCollectableStateResult> {
    const { collectableId, ownerId, status, url } = params

    const collectable = await this.collectablesRepository.findByIdAndOwnerId(
      collectableId,
      ownerId,
    )
    if (!collectable) {
      return left(new ResourceNotFoundException('collectable'))
    }

    const reference = await this.referencesRepository.findById(
      collectable.referenceId,
    )
    if (!reference) {
      return left(new ResourceNotFoundException('reference'))
    }

    const statusChanges = collectable.status !== status
    const urlChanges = reference.url !== url
    const nothingChanges = !statusChanges && !urlChanges

    if (nothingChanges) {
      return left(new NothingToChangeException())
    }

    const newStatus = status as CollectableStatus

    if (!collectable.isStatusValid(newStatus)) {
      return left(
        new EntityValidationException(`${status} is not a valid status`),
      )
    }

    collectable.status = newStatus
    reference.url = url

    await this.collectablesRepository.save(collectable)
    await this.referencesRepository.save(reference)

    return right(null)
  }
}
