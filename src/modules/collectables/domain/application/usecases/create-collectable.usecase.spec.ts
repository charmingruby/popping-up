import { makeCollectable } from 'test/factories/make-collectable'
import { makeCollection } from 'test/factories/make-collection'
import { makeReference } from 'test/factories/make-reference'
import { InMemoryCollectablesRepository } from 'test/repositories/in-memory-collectables.repository'
import { InMemoryCollectionsRepository } from 'test/repositories/in-memory-collections.repository'
import { InMemoryReferencesRepository } from 'test/repositories/in-memory-references.repository'

import { Identifier } from '@/common/core/entities/identifier.entity'
import { ResourceAlreadyExistsException } from '@/common/core/exceptions/resource-already-exists.exception'
import { ResourceNotFoundException } from '@/common/core/exceptions/resource-not-found.exception'

import { CreateCollectableParams } from '../gateways/create-collectable.gateway'
import { CreateCollectableUseCase } from './create-collectable.usecase'

let inMemoryCollectionsRepository: InMemoryCollectionsRepository
let inMemoryCollectablesRepository: InMemoryCollectablesRepository
let inMemoryReferencesRepository: InMemoryReferencesRepository
let sut: CreateCollectableUseCase

describe('[COLLECTABLES] Create Collectable Use Case', () => {
  beforeEach(() => {
    inMemoryCollectionsRepository = new InMemoryCollectionsRepository()
    inMemoryCollectablesRepository = new InMemoryCollectablesRepository()
    inMemoryReferencesRepository = new InMemoryReferencesRepository()
    inMemoryCollectionsRepository.items = []
    inMemoryCollectablesRepository.items = []
    inMemoryReferencesRepository.items = []
    sut = new CreateCollectableUseCase(
      inMemoryCollectionsRepository,
      inMemoryReferencesRepository,
      inMemoryCollectablesRepository,
    )
  })

  const validParams: CreateCollectableParams = {
    collectionId: 'collectionId',
    ownerId: 'ownerId',
    collectableName: 'collectableName',
    collectableDescription: 'collectableDescription',
    referenceTitle: 'referenceTitle',
    referenceObservation: 'referenceObservation',
    referenceUrl: 'referenceUrl',
    referencePriceInCents: 10000,
  }

  it('should be able to create a new collectable', async () => {
    const ownerId = new Identifier('owner-id')

    const collection = makeCollection({ ownerId })
    inMemoryCollectionsRepository.items.push(collection)

    const result = await sut.perform({
      ...validParams,
      ownerId: ownerId.toString,
      collectionId: collection.id,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toBeNull()
    expect(inMemoryCollectablesRepository.items[0].name).toBe(
      validParams.collectableName,
    )
    expect(inMemoryReferencesRepository.items[0].title).toBe(
      validParams.referenceTitle,
    )
  })

  it('should be not able to create a new collectable with an invalid collectionId', async () => {
    const ownerId = new Identifier('owner-id')

    const result = await sut.perform({
      ...validParams,
      ownerId: ownerId.toString,
      collectionId: new Identifier('invalid-collection-id').toString,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundException)
  })

  it('should be not able to create a new collectable if user is not the collection owner', async () => {
    const collectionOwnerId = new Identifier('owner-id')

    const collection = makeCollection({ ownerId: collectionOwnerId })
    inMemoryCollectionsRepository.items.push(collection)

    const result = await sut.perform({
      ...validParams,
      ownerId: new Identifier('invalid-owner-id').toString,
      collectionId: collection.id,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundException)
  })

  it('should be not able to create a new collectable if collectable name is already taken', async () => {
    const ownerId = new Identifier('owner-id')
    const conflictingCollectableName = 'conflicting-collectable-name'

    const collection = makeCollection({ ownerId })
    inMemoryCollectionsRepository.items.push(collection)

    const conflictingCollectable = makeCollectable({
      name: conflictingCollectableName,
      collectionId: new Identifier(collection.id),
    })
    inMemoryCollectablesRepository.items.push(conflictingCollectable)

    const result = await sut.perform({
      ...validParams,
      collectableName: conflictingCollectableName,
      ownerId: ownerId.toString,
      collectionId: collection.id,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsException)
  })

  it('should be not able to create a new collectable if reference title is already taken', async () => {
    const ownerId = new Identifier('owner-id')
    const conflictingReferenceTitle = 'conflicting-reference-title'

    const collection = makeCollection({ ownerId })
    inMemoryCollectionsRepository.items.push(collection)

    const conflictingReference = makeReference({
      title: conflictingReferenceTitle,
    })
    inMemoryReferencesRepository.items.push(conflictingReference)

    const result = await sut.perform({
      ...validParams,
      referenceTitle: conflictingReferenceTitle,
      ownerId: ownerId.toString,
      collectionId: collection.id,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsException)
  })
})
