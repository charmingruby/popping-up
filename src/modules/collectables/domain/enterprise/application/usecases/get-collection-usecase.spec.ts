import { makeCollection } from 'test/factories/make-collection'
import { InMemoryCollectionsRepository } from 'test/repositories/in-memory-collections-repository'

import { Identifier } from '@/common/core/entities/identifier'
import { ResourceNotFoundError } from '@/common/core/errors/resource-not-found-error'

import { GetCollectionUseCase } from './get-collection-usecase'

let inMemoryCollectionsRepository: InMemoryCollectionsRepository
let sut: GetCollectionUseCase

describe('[COLLECTIONS] Get Collection Use Case', () => {
  beforeEach(() => {
    inMemoryCollectionsRepository = new InMemoryCollectionsRepository()
    inMemoryCollectionsRepository.items = []
    sut = new GetCollectionUseCase(inMemoryCollectionsRepository)
  })

  it('should be able to get a collection successfully', async () => {
    const ownerId = new Identifier('owner-id')
    const collection = makeCollection({ ownerId })
    inMemoryCollectionsRepository.items.push(collection)

    const result = await sut.perform({
      collectionId: collection.id,
      ownerId: ownerId.toString,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual(collection)
  })

  it("should be not able to get a collection that doesn't exists", async () => {
    const ownerId = new Identifier('owner-id')

    const result = await sut.perform({
      collectionId: 'non-existing-collection-id',
      ownerId: ownerId.toString,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it("should be not able to get a collection that doesn't owns", async () => {
    const ownerId = new Identifier('owner-id')
    const collection = makeCollection({ ownerId })
    inMemoryCollectionsRepository.items.push(collection)

    const result = await sut.perform({
      collectionId: collection.id,
      ownerId: 'invalid-owner-id',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
