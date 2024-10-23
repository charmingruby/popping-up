import { makeCollection } from 'test/factories/make-collection'
import { InMemoryCollectionsRepository } from 'test/repositories/in-memory-collections-repository'

import { Identifier } from '@/common/core/entities/identifier.entity'
import { ResourceAlreadyExistsException } from '@/common/core/exceptions/resource-already-exists.exception'

import { CreateCollectionUseCase } from './create-collection-usecase'

let inMemoryCollectionsRepository: InMemoryCollectionsRepository
let sut: CreateCollectionUseCase

describe('[COLLECTIONS] Create Collection Use Case', () => {
  beforeEach(() => {
    inMemoryCollectionsRepository = new InMemoryCollectionsRepository()
    inMemoryCollectionsRepository.items = []
    sut = new CreateCollectionUseCase(inMemoryCollectionsRepository)
  })

  it('should be able to create a new collection', async () => {
    const name = 'my collection'

    const result = await sut.perform({
      name,
      description: 'my collection description',
      theme: 'my collection theme',
      ownerId: new Identifier('owner-id').toString,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toBe(null)
    expect(inMemoryCollectionsRepository.items.length).toBe(1)
    expect(inMemoryCollectionsRepository.items[0].name).toBe(name)
  })

  it('should be not able to create a new collection with an already used name by an account', async () => {
    const conflictingName = 'conflicting collection'
    const ownerId = new Identifier('owner-id')

    inMemoryCollectionsRepository.items.push(
      makeCollection({ name: conflictingName, ownerId }),
    )

    const result = await sut.perform({
      name: conflictingName,
      description: 'collection description',
      theme: 'collection theme',
      ownerId: ownerId.toString,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsException)
  })
})
