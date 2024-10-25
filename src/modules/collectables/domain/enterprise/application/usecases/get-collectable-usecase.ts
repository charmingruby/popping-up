import { left, right } from '@/common/core/either'
import { ResourceNotFoundException } from '@/common/core/exceptions/resource-not-found.exception'

import {
  GetCollectableGateway,
  GetCollectableParams,
  GetCollectableResult,
} from '../gateways/get-collectable-gateway'
import { CollectablesRepository } from '../repositories/collectables-repository'

export class GetCollectableUseCase implements GetCollectableGateway {
  constructor(
    private readonly collectablesRepository: CollectablesRepository,
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

    return right(collectable)
  }
}
