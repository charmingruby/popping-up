import { Identifier } from '@/common/core/entities/identifier.entity'

import { Collectable, CollectableStatus } from './collectable.entity'

describe('[COLLECTABLES] Collectables Entity', () => {
  const ownerId = new Identifier('owner-id')
  const name = 'collectable name'
  const description = 'collectable description'
  const collectionId = new Identifier('collectable collectionId')
  const referenceId = new Identifier('collectable referenceId')

  it('should create a collectable entity', () => {
    const sut = Collectable.create({
      ownerId,
      name,
      description,
      collectionId,
      referenceId,
    })

    const defaultStatus: CollectableStatus = 'PENDING'

    expect(sut).toBeDefined()
    expect(sut.name).toEqual(name)
    expect(sut.ownerId).toEqual(ownerId.toString)
    expect(sut.description).toEqual(description)
    expect(sut.collectionId).toEqual(collectionId.toString)
    expect(sut.referenceId).toEqual(referenceId.toString)
    expect(sut.status).toEqual(defaultStatus)
    expect(sut.createdAt).toEqual(expect.any(Date))
    expect(sut.updatedAt).toBeUndefined()
  })
})
