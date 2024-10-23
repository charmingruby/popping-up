import { Identifier } from '@/common/core/entities/identifier.entity'

import { Tag } from './tag'

describe('[COLLECTABLES] Tags Entity', () => {
  const name = 'tag name'
  const description = 'tag description'
  const collectionId = new Identifier('collection-id')

  it('should create a tag entity', () => {
    const sut = Tag.create({
      name,
      description,
      collectionId,
    })

    expect(sut).toBeDefined()
    expect(sut.name).toEqual(name)
    expect(sut.description).toEqual(description)
    expect(sut.collectionId).toEqual(collectionId.toString)
    expect(sut.collectables.length).toBe(0)
    expect(sut.createdAt).toEqual(expect.any(Date))
    expect(sut.updatedAt).toBeUndefined()
  })
})
