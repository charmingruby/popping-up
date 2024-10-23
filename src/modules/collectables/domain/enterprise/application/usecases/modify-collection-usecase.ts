import { left, right } from '@/common/core/either'
import { NothingToChangeException } from '@/common/core/exceptions/nothing-to-change.exception'
import { ResourceAlreadyExistsException } from '@/common/core/exceptions/resource-already-exists.exception'
import { ResourceNotFoundException } from '@/common/core/exceptions/resource-not-found.exception'

import {
  ModifyCollectionGateway,
  ModifyCollectionParams,
  ModifyCollectionResult,
} from '../gateways/modify-collection-gateway'
import { CollectionsRepository } from '../repositories/collections-repository'

export class ModifyCollectionUseCase implements ModifyCollectionGateway {
  constructor(private readonly collectionsRepository: CollectionsRepository) {}

  async perform(
    params: ModifyCollectionParams,
  ): Promise<ModifyCollectionResult> {
    const { ownerId, collectionId, name, description, theme } = params

    const collection = await this.collectionsRepository.findByIdAndOwnerId(
      ownerId,
      collectionId,
    )
    if (!collection) {
      return left(new ResourceNotFoundException('collection'))
    }

    const nameChanges = collection.name !== name
    const descriptionChanges = collection.description !== description
    const themeChanges = collection.theme !== theme
    const nothingChanges = !nameChanges && !descriptionChanges && !themeChanges

    if (nothingChanges) {
      return left(new NothingToChangeException())
    }

    if (nameChanges) {
      const nameAlreadyTaken =
        await this.collectionsRepository.findByNameAndOwnerId(name, ownerId)

      if (nameAlreadyTaken) {
        return left(new ResourceAlreadyExistsException('collection'))
      }
    }

    collection.name = name
    collection.description = description
    collection.theme = theme

    await this.collectionsRepository.save(collection)

    return right(null)
  }
}
