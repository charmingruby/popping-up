import { right } from '@/common/core/either'

import {
  FetchCollectionsGateway,
  FetchCollectionsParams,
  FetchCollectionsResult,
} from '../gateways/fetch-collections.gateway'
import { CollectionsRepository } from '../repositories/collections.repository'

export class FetchCollectionsUseCase implements FetchCollectionsGateway {
  constructor(private readonly collectionsRepository: CollectionsRepository) {}

  async perform(
    params: FetchCollectionsParams,
  ): Promise<FetchCollectionsResult> {
    const { ownerId } = params

    const collections =
      await this.collectionsRepository.findManyByOwnerId(ownerId)

    return right(collections)
  }
}
