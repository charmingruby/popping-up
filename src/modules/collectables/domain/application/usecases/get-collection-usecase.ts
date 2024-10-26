import { left, right } from '@/common/core/either'
import { ResourceNotFoundException } from '@/common/core/exceptions/resource-not-found.exception'

import {
  GetCollectionGateway,
  GetCollectionParams,
  GetCollectionResult,
} from '../gateways/get-collection-gateway'
import { CollectionsRepository } from '../repositories/collections-repository'

export class GetCollectionUseCase implements GetCollectionGateway {
  constructor(private readonly collectionsRepository: CollectionsRepository) {}

  async perform(params: GetCollectionParams): Promise<GetCollectionResult> {
    const { collectionId, ownerId } = params

    const collection = await this.collectionsRepository.findByIdAndOwnerId(
      ownerId,
      collectionId,
    )

    if (!collection) {
      return left(new ResourceNotFoundException('collection'))
    }

    return right(collection)
  }
}
