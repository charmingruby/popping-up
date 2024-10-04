import { Identifier } from '@/core/entities/identifier'
import { Collectable, CollectableStatus } from './collectable'

describe('[COLLECTABLES] Collectables Entity', () => {
  const name = 'collectable name'
  const description = 'collectable description'
  const collectionId = new Identifier('collectable collectionId')
  const referenceId = new Identifier('collectable referenceId')

  it('should create a collectable entity', () => {
    const sut = Collectable.create({
      name,
      description,
      collectionId,
      referenceId,
    })

    const defaultStatus: CollectableStatus = 'PENDING'

    expect(sut).toBeDefined()
    expect(sut.name).toEqual(name)
    expect(sut.description).toEqual(description)
    expect(sut.collectionId).toEqual(collectionId.toString)
    expect(sut.referenceId).toEqual(referenceId.toString)
    expect(sut.status).toEqual(defaultStatus)
    expect(sut.tags.length).toBe(0)
    expect(sut.createdAt).toEqual(expect.any(Date))
    expect(sut.updatedAt).toBeUndefined()
  })
})
