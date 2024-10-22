import { left, right } from '@/common/core/either'
import { NothingToChangeError } from '@/common/core/errors/nothing-to-change-error'
import { ResourceAlreadyExistsError } from '@/common/core/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@/common/core/errors/resource-not-found-error'

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
      return left(new ResourceNotFoundError('collection'))
    }

    const nameChanges = collection.name !== name
    const descriptionChanges = collection.description !== description
    const themeChanges = collection.theme !== theme
    const nothingChanges = !nameChanges && !descriptionChanges && !themeChanges

    if (nothingChanges) {
      return left(new NothingToChangeError())
    }

    if (nameChanges) {
      const nameAlreadyTaken =
        await this.collectionsRepository.findByNameAndOwnerId(name, ownerId)

      if (nameAlreadyTaken) {
        return left(new ResourceAlreadyExistsError('collection'))
      }
    }

    collection.name = name
    collection.description = description
    collection.theme = theme

    await this.collectionsRepository.save(collection)

    return right(null)
  }
}
