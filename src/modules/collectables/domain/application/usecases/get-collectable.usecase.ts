import { left, right } from '@/common/core/either'
import { ResourceNotFoundException } from '@/common/core/exceptions/resource-not-found.exception'

import {
  GetCollectableGateway,
  GetCollectableParams,
  GetCollectableResult,
} from '../gateways/get-collectable.gateway'
import { CollectablesRepository } from '../repositories/collectables.repository'
import { ReferencesRepository } from '../repositories/references.repository'

export class GetCollectableUseCase implements GetCollectableGateway {
  constructor(
    private readonly collectablesRepository: CollectablesRepository,
    private readonly referencesRepository: ReferencesRepository,
  ) {}

  async perform(params: GetCollectableParams): Promise<GetCollectableResult> {
    const { collectableId, collectionId } = params

    const collectable =
      await this.collectablesRepository.findByIdAndCollectionId(
        collectableId,
        collectionId,
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

    collectable.reference = reference

    return right(collectable)
  }
}
