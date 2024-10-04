import { Identifier } from '@/core/entities/identifier'
import { Collection } from './collection'

describe('[COLLECTABLES] Collection Entity', () => {
  const name = 'collection name'
  const theme = 'collection theme'
  const description = 'collection description'
  const ownerId = new Identifier('owner-id')
  const totalCollectables = 0
  const totalInvestmentInCents = 10000

  it('should create a collection entity', () => {
    const collection = Collection.create({
      name,
      theme,
      ownerId,
      description,
      totalCollectables,
      totalInvestmentInCents,
    })

    expect(collection).toBeDefined()
    expect(collection.name).toEqual(name)
    expect(collection.theme).toEqual(theme)
    expect(collection.ownerId).toEqual(ownerId.toString)
    expect(collection.description).toEqual(description)
    expect(collection.totalCollectables).toEqual(totalCollectables)
    expect(collection.totalInvestmentInCents).toEqual(totalInvestmentInCents)
    expect(collection.collectables.length).toBe(0)
    expect(collection.tags.length).toBe(0)
    expect(collection.createdAt).toEqual(expect.any(Date))
    expect(collection.updatedAt).toBeUndefined()
  })
})
