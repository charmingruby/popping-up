import { Tag } from './tag'

describe('[COLLECTABLES] Tags Entity', () => {
  const name = 'tag name'
  const description = 'tag description'

  it('should create a tag entity', () => {
    const sut = Tag.create({
      name,
      description,
    })

    expect(sut).toBeDefined()
    expect(sut.name).toEqual(name)
    expect(sut.description).toEqual(description)
    expect(sut.createdAt).toEqual(expect.any(Date))
    expect(sut.updatedAt).toBeUndefined()
  })
})
