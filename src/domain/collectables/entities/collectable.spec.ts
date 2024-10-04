import { Identifier } from '@/core/entities/identifier'
import { Collectable } from './collectable'

describe('[COLLECTABLES] Collectables Entity', () => {
  const name = 'collectable name'
  const description = 'collectable description'
  const collectionId = new Identifier('collectable collectionId')
  const referenceId = new Identifier('collectable referenceId')

  it('should create a collection entity', () => {
    const sut = Collectable.create({
      name,
      description,
      collectionId,
      referenceId,
    })

    expect(sut).toBeDefined()
    expect(sut.name).toEqual(name)
    expect(sut.description).toEqual(description)
    expect(sut.collectionId).toEqual(collectionId.toString)
    expect(sut.referenceId).toEqual(referenceId.toString)
    expect(sut.tags.length).toBe(0)
    expect(sut.createdAt).toEqual(expect.any(Date))
    expect(sut.updatedAt).toBeUndefined()
  })
})
