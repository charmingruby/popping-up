import { makeCollection } from 'test/factories/make-collection'
import { InMemoryCollectionsRepository } from 'test/repositories/in-memory-collections.repository'

import { Identifier } from '@/common/core/entities/identifier.entity'

import { FetchCollectionsUseCase } from './fetch-collections.usecase'

let inMemoryCollectionsRepository: InMemoryCollectionsRepository
let sut: FetchCollectionsUseCase

describe('[COLLECTABLES] Fetch Collections Use Case', () => {
  beforeEach(() => {
    inMemoryCollectionsRepository = new InMemoryCollectionsRepository()
    inMemoryCollectionsRepository.items = []
    sut = new FetchCollectionsUseCase(inMemoryCollectionsRepository)
  })

  it('should be able to fetch collections successfully', async () => {
    const ownerId = new Identifier('owner-id')
    const collection1 = makeCollection({ ownerId })
    const collection2 = makeCollection({ ownerId })
    inMemoryCollectionsRepository.items.push(collection1, collection2)

    const result = await sut.perform({
      ownerId: ownerId.toString,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual([collection1, collection2])
  })

  it('should return an empty array if there are no collections for the owner', async () => {
    const ownerId = new Identifier('owner-id')

    const result = await sut.perform({
      ownerId: ownerId.toString,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual([])
  })
})
