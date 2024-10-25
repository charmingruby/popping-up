import { left, right } from '@/common/core/either'
import { Identifier } from '@/common/core/entities/identifier.entity'
import { ResourceAlreadyExistsException } from '@/common/core/exceptions/resource-already-exists.exception'
import { ResourceNotFoundException } from '@/common/core/exceptions/resource-not-found.exception'

import { Collectable } from '../../entities/collectable'
import { Reference } from '../../entities/reference'
import {
  CreateCollectableGateway,
  CreateCollectableParams,
  CreateCollectableResult,
} from '../gateways/create-collectable-gateway'
import { CollectablesRepository } from '../repositories/collectables-repository'
import { CollectionsRepository } from '../repositories/collections-repository'
import { ReferencesRepository } from '../repositories/references-repository'

export class CreateCollectableUseCase implements CreateCollectableGateway {
  constructor(
    private readonly collectionsRepository: CollectionsRepository,
    private readonly referencesRepository: ReferencesRepository,
    private readonly collectablesRepository: CollectablesRepository,
  ) {}

  async perform(
    params: CreateCollectableParams,
  ): Promise<CreateCollectableResult> {
    const {
      ownerId,
      collectionId,
      collectableName,
      collectableDescription,
      referenceObservation,
      referencePriceInCents,
      referenceTitle,
      referenceUrl,
    } = params

    const collection = await this.collectionsRepository.findByIdAndOwnerId(
      ownerId,
      collectionId,
    )
    if (!collection) {
      return left(new ResourceNotFoundException('collection'))
    }

    const collectableAlreadyExists =
      await this.collectablesRepository.findByNameAndCollectionId(
        collectableName,
        collectionId,
      )
    if (collectableAlreadyExists) {
      return left(new ResourceAlreadyExistsException('collectable'))
    }

    const referenceAlreadyExists =
      await this.referencesRepository.findByTitle(referenceTitle)
    if (referenceAlreadyExists) {
      return left(new ResourceAlreadyExistsException('reference'))
    }

    const reference = Reference.create({
      title: referenceTitle,
      url: referenceUrl,
      observation: referenceObservation,
      priceInCents: referencePriceInCents,
    })

    await this.referencesRepository.create(reference)

    const collectable = Collectable.create({
      name: collectableName,
      description: collectableDescription,
      collectionId: new Identifier(collectionId),
      referenceId: new Identifier(reference.id),
      status: 'PENDING',
    })

    await this.collectablesRepository.create(collectable)

    return right(null)
  }
}
