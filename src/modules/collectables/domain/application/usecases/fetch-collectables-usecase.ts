import { right } from '@/common/core/either'

import {
  FetchCollectablesGateway,
  FetchCollectablesParams,
  FetchCollectablesResult,
} from '../gateways/fetch-collectables-gateway'
import { CollectablesRepository } from '../repositories/collectables-repository'

export class FetchCollectablesUseCase implements FetchCollectablesGateway {
  constructor(
    private readonly collectablesRepository: CollectablesRepository,
  ) {}

  async perform(
    params: FetchCollectablesParams,
  ): Promise<FetchCollectablesResult> {
    const { collectionId, ownerId } = params

    const collectables =
      await this.collectablesRepository.findManyByOwnerIdAndCollectionId(
        ownerId,
        collectionId,
      )

    return right(collectables)
  }
}
