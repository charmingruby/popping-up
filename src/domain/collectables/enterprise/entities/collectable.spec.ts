import { Identifier } from '@/core/entities/identifier'
import { Collectable, CollectableStatus } from './collectable'
import { Tag } from './tag'

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

  it('should be able to attach tags to collectable entity', () => {
    const sut = Collectable.create({
      name,
      description,
      collectionId,
      referenceId,
    })

    const tagsQuantity = 2

    const tags = Array.from({ length: tagsQuantity }, (_, index) =>
      Tag.create({
        name: `tag ${index}`,
        collectionId: new Identifier('collectionId'),
        description: `tag description ${index}`,
      }),
    )

    sut.tags = tags

    expect(sut.tags).toEqual(tags)
    expect(sut.tags.length).toEqual(tagsQuantity)
  })
})
