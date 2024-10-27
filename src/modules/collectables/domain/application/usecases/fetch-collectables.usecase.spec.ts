import { makeCollectable } from 'test/factories/make-collectable'
import { InMemoryCollectablesRepository } from 'test/repositories/in-memory-collectables.repository'

import { Identifier } from '@/common/core/entities/identifier.entity'

import { FetchCollectablesUseCase } from './fetch-collectables.usecase'

let inMemoryCollectablesRepository: InMemoryCollectablesRepository
let sut: FetchCollectablesUseCase

describe('[COLLECTABLES] Fetch Collectables Use Case', () => {
  beforeEach(() => {
    inMemoryCollectablesRepository = new InMemoryCollectablesRepository()
    inMemoryCollectablesRepository.items = []
    sut = new FetchCollectablesUseCase(inMemoryCollectablesRepository)
  })

  it('should be able to fetch collectables successfully', async () => {
    const ownerId = new Identifier('owner-id')
    const collectionId = new Identifier('collection-id')
    const collectable1 = makeCollectable({ ownerId, collectionId })
    const collectable2 = makeCollectable({ ownerId, collectionId })

    inMemoryCollectablesRepository.items.push(collectable1, collectable2)

    const result = await sut.perform({
      ownerId: ownerId.toString,
      collectionId: collectionId.toString,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual([collectable1, collectable2])
  })

  it('should return an empty array if there are no collectables for the owner and collection', async () => {
    const ownerId = new Identifier('owner-id')
    const collectionId = new Identifier('collection-id')

    const result = await sut.perform({
      ownerId: ownerId.toString,
      collectionId: collectionId.toString,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual([])
  })
})
