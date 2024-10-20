import { left, right } from '@/common/core/either'
import { Identifier } from '@/common/core/entities/identifier'
import { ResourceAlreadyExistsError } from '@/common/core/errors/resource-already-exists-error'

import { Collection } from '../../entities/collection'
import {
  CreateCollectionGateway,
  CreateCollectionParams,
  CreateCollectionResult,
} from '../gateways/create-collection-gateway'
import { CollectionsRepository } from '../repositories/collections-repository'

export class CreateCollectionUseCase implements CreateCollectionGateway {
  constructor(private readonly collectionsRepository: CollectionsRepository) {}

  async perform(
    params: CreateCollectionParams,
  ): Promise<CreateCollectionResult> {
    const { name, description, theme, ownerId } = params

    const collectionAlreadyExists =
      await this.collectionsRepository.findByNameAndOwnerId(name, ownerId)

    if (collectionAlreadyExists) {
      return left(new ResourceAlreadyExistsError('collection'))
    }

    const collection = Collection.create({
      name,
      description,
      theme,
      ownerId: new Identifier(ownerId),
    })

    await this.collectionsRepository.create(collection)

    return right(null)
  }
}