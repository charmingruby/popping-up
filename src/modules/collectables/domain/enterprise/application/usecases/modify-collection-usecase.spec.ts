import { makeCollection } from 'test/factories/make-collection'
import { InMemoryCollectionsRepository } from 'test/repositories/in-memory-collections-repository'

import { Identifier } from '@/common/core/entities/identifier'
import { NothingToChangeError } from '@/common/core/errors/nothing-to-change-error'
import { ResourceAlreadyExistsError } from '@/common/core/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@/common/core/errors/resource-not-found-error'

import { ModifyCollectionUseCase } from './modify-collection-usecase'

let inMemoryCollectionsRepository: InMemoryCollectionsRepository
let sut: ModifyCollectionUseCase

describe('[COLLECTIONS] Modify Collection Use Case', () => {
  beforeEach(() => {
    inMemoryCollectionsRepository = new InMemoryCollectionsRepository()
    inMemoryCollectionsRepository.items = []
    sut = new ModifyCollectionUseCase(inMemoryCollectionsRepository)
  })

  it('should be able to modify a collection', async () => {
    const ownerId = new Identifier('owner-id')
    const collection = makeCollection({ ownerId })

    inMemoryCollectionsRepository.items.push(collection)

    const newName = collection.name + '-new'
    const newDescription = collection.description + '-new'
    const newTheme = collection.theme + '-new'

    const result = await sut.perform({
      ownerId: ownerId.toString,
      collectionId: collection.id,
      name: newName,
      description: newDescription,
      theme: newTheme,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toBeNull()

    const modifiedCollection = inMemoryCollectionsRepository.items[0]

    expect(modifiedCollection.name).toBe(newName)
    expect(modifiedCollection.description).toBe(newDescription)
    expect(modifiedCollection.theme).toBe(newTheme)
  })

  it("should be not able to modify a collection that doesn't exists", async () => {
    const ownerId = new Identifier('owner-id')
    const result = await sut.perform({
      ownerId: ownerId.toString,
      collectionId: new Identifier('collection-id').toString,
      name: 'collection-name',
      description: 'collection-description',
      theme: 'collection-theme',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it("should be not able to modify a collection that the user doesn't owns", async () => {
    const ownerId = new Identifier('owner-id')
    const collection = makeCollection({ ownerId })

    inMemoryCollectionsRepository.items.push(collection)

    const newName = collection.name + '-new'
    const newDescription = collection.description + '-new'
    const newTheme = collection.theme + '-new'

    const result = await sut.perform({
      ownerId: new Identifier('another-owner-id').toString,
      collectionId: collection.id,
      name: newName,
      description: newDescription,
      theme: newTheme,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it("should be not able to modify a collection that doesn't have anything to change", async () => {
    const ownerId = new Identifier('owner-id')
    const collection = makeCollection({ ownerId })

    inMemoryCollectionsRepository.items.push(collection)

    const result = await sut.perform({
      ownerId: ownerId.toString,
      collectionId: collection.id,
      name: collection.name,
      description: collection.description,
      theme: collection.theme,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NothingToChangeError)
  })

  it('should be not able to modify a collection that new name is already taken', async () => {
    const ownerId = new Identifier('owner-id')
    const conflictingName = 'conflicting-name'

    const collection = makeCollection({ name: 'name', ownerId })

    inMemoryCollectionsRepository.items.push(collection)
    inMemoryCollectionsRepository.items.push(
      makeCollection({ name: conflictingName, ownerId }),
    )

    const result = await sut.perform({
      ownerId: ownerId.toString,
      collectionId: collection.id,
      name: conflictingName,
      description: collection.description,
      theme: collection.theme,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
