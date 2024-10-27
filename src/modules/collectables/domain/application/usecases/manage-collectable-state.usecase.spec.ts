import { makeCollectable } from 'test/factories/make-collectable'
import { makeReference } from 'test/factories/make-reference'
import { InMemoryCollectablesRepository } from 'test/repositories/in-memory-collectables.repository'
import { InMemoryReferencesRepository } from 'test/repositories/in-memory-references.repository'

import { Identifier } from '@/common/core/entities/identifier.entity'
import { EntityValidationException } from '@/common/core/exceptions/entity-validation.exception'
import { NothingToChangeException } from '@/common/core/exceptions/nothing-to-change.exception'
import { ResourceNotFoundException } from '@/common/core/exceptions/resource-not-found.exception'

import { ManageCollectableStateUseCase } from './manage-collectable-state.usecase'

let inMemoryCollectablesRepository: InMemoryCollectablesRepository
let inMemoryReferencesRepository: InMemoryReferencesRepository
let sut: ManageCollectableStateUseCase

describe('[COLLECTABLES] Manage Collectable State Use Case', () => {
  beforeEach(() => {
    inMemoryCollectablesRepository = new InMemoryCollectablesRepository()
    inMemoryReferencesRepository = new InMemoryReferencesRepository()
    sut = new ManageCollectableStateUseCase(
      inMemoryCollectablesRepository,
      inMemoryReferencesRepository,
    )
  })

  it('should be able to modify the state of a collectable', async () => {
    const ownerId = new Identifier('owner-id')
    const reference = makeReference()
    const collectable = makeCollectable({
      ownerId,
      referenceId: new Identifier(reference.id),
    })

    inMemoryCollectablesRepository.items.push(collectable)
    inMemoryReferencesRepository.items.push(reference)

    const newStatus = 'ACQUIRED'
    const newUrl = reference.url + '/new'

    const result = await sut.perform({
      collectableId: collectable.id,
      ownerId: ownerId.toString,
      status: newStatus,
      url: newUrl,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toBeNull()

    const modifiedCollectable = inMemoryCollectablesRepository.items[0]
    const modifiedReference = inMemoryReferencesRepository.items[0]

    expect(modifiedCollectable.status).toBe(newStatus)
    expect(modifiedReference.url).toBe(newUrl)
  })

  it("should not be able to modify the state of a collectable that doesn't exist", async () => {
    const ownerId = new Identifier('owner-id')
    const result = await sut.perform({
      collectableId: new Identifier('collectable-id').toString,
      ownerId: ownerId.toString,
      status: 'ACQUIRED',
      url: 'new-url',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundException)
  })

  it("should not be able to modify the state of a collectable that the user doesn't own", async () => {
    const ownerId = new Identifier('owner-id')
    const reference = makeReference()
    const collectable = makeCollectable({
      ownerId,
      referenceId: new Identifier(reference.id),
    })

    inMemoryCollectablesRepository.items.push(collectable)
    inMemoryReferencesRepository.items.push(reference)

    const result = await sut.perform({
      collectableId: collectable.id,
      ownerId: new Identifier('another-owner-id').toString,
      status: 'ACQUIRED',
      url: reference.url + '/new',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundException)
  })

  it('should not be able to modify the state of a collectable without any changes', async () => {
    const ownerId = new Identifier('owner-id')
    const reference = makeReference()
    const collectable = makeCollectable({
      ownerId,
      referenceId: new Identifier(reference.id),
    })

    inMemoryCollectablesRepository.items.push(collectable)
    inMemoryReferencesRepository.items.push(reference)

    const result = await sut.perform({
      collectableId: collectable.id,
      ownerId: ownerId.toString,
      status: collectable.status,
      url: reference.url,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NothingToChangeException)
  })

  it('should not be able to modify the state of a collectable with an invalid status', async () => {
    const ownerId = new Identifier('owner-id')
    const reference = makeReference()
    const collectable = makeCollectable({
      ownerId,
      referenceId: new Identifier(reference.id),
    })

    inMemoryCollectablesRepository.items.push(collectable)
    inMemoryReferencesRepository.items.push(reference)

    const invalidStatus = 'INVALID_STATUS'

    const result = await sut.perform({
      collectableId: collectable.id,
      ownerId: ownerId.toString,
      status: invalidStatus,
      url: reference.url + '/new',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(EntityValidationException)
  })
})
