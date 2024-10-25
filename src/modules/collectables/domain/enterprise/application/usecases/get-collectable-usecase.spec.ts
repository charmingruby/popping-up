import { makeCollectable } from 'test/factories/make-collectable'
import { makeCollection } from 'test/factories/make-collection'
import { makeReference } from 'test/factories/make-reference'
import { InMemoryCollectablesRepository } from 'test/repositories/in-memory-collectables-repository'
import { InMemoryCollectionsRepository } from 'test/repositories/in-memory-collections-repository'
import { InMemoryReferencesRepository } from 'test/repositories/in-memory-references-repository'

import { Identifier } from '@/common/core/entities/identifier.entity'
import { ResourceNotFoundException } from '@/common/core/exceptions/resource-not-found.exception'

import { GetCollectableUseCase } from './get-collectable-usecase'

let inMemoryCollectionsRepository: InMemoryCollectionsRepository
let inMemoryCollectablesRepository: InMemoryCollectablesRepository
let inMemoryReferencesRepository: InMemoryReferencesRepository
let sut: GetCollectableUseCase

describe('[COLLECTABLES] Get Collectable Use Case', () => {
  beforeEach(() => {
    inMemoryCollectionsRepository = new InMemoryCollectionsRepository()
    inMemoryCollectablesRepository = new InMemoryCollectablesRepository()
    inMemoryReferencesRepository = new InMemoryReferencesRepository()
    inMemoryCollectablesRepository.items = []
    inMemoryReferencesRepository.items = []
    inMemoryCollectionsRepository.items = []
    sut = new GetCollectableUseCase(
      inMemoryCollectablesRepository,
      inMemoryReferencesRepository,
    )
  })

  it('should be able to get a collectable successfully', async () => {
    const ownerId = new Identifier('owner-id')

    const collection = makeCollection({ ownerId })
    inMemoryCollectionsRepository.items.push(collection)

    const reference = makeReference()
    inMemoryReferencesRepository.items.push(reference)

    const collectable = makeCollectable({
      collectionId: new Identifier(collection.id),
      referenceId: new Identifier(reference.id),
    })
    inMemoryCollectablesRepository.items.push(collectable)

    const result = await sut.perform({
      collectableId: collectable.id,
      collectionId: collection.id,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual(collectable)
  })

  it("should be not able to get a collectable that doesn't exists", async () => {
    const ownerId = new Identifier('owner-id')

    const collection = makeCollection({ ownerId })
    inMemoryCollectionsRepository.items.push(collection)

    const result = await sut.perform({
      collectableId: 'non-existing-collectable-id',
      collectionId: collection.id,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundException)
  })
})
