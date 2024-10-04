import { Identifier } from '@/core/entities/identifier'
import { Collectable } from './collectable'

describe('[COLLECTABLES] Collectables Entity', () => {
  const name = 'collectable name'
  const description = 'collectable description'
  const collectionId = new Identifier('collectable collectionId')
  const referenceId = new Identifier('collectable referenceId')

  it('should create a collection entity', () => {
    const collectable = Collectable.create({
      name,
      description,
      collectionId,
      referenceId,
    })

    expect(collectable).toBeDefined()
    expect(collectable.name).toEqual(name)
    expect(collectable.description).toEqual(description)
    expect(collectable.collectionId).toEqual(collectionId.toString)
    expect(collectable.referenceId).toEqual(referenceId.toString)
    expect(collectable.tags.length).toBe(0)
    expect(collectable.createdAt).toEqual(expect.any(Date))
    expect(collectable.updatedAt).toBeUndefined()
  })
})
