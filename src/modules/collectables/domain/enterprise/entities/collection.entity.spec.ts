import { Identifier } from '@/common/core/entities/identifier.entity'

import { Collectable } from './collectable.entity'
import { Collection } from './collection.entity'

describe('[COLLECTABLES] Collection Entity', () => {
  const name = 'collection name'
  const theme = 'collection theme'
  const description = 'collection description'
  const ownerId = new Identifier('owner-id')
  const totalCollectables = 0
  const totalInvestmentInCents = 10000

  it('should create a collection entity', () => {
    const sut = Collection.create({
      name,
      theme,
      ownerId,
      description,
      totalCollectables,
      totalInvestmentInCents,
    })

    expect(sut).toBeDefined()
    expect(sut.name).toEqual(name)
    expect(sut.theme).toEqual(theme)
    expect(sut.ownerId).toEqual(ownerId.toString)
    expect(sut.description).toEqual(description)
    expect(sut.totalCollectables).toEqual(totalCollectables)
    expect(sut.totalInvestmentInCents).toEqual(totalInvestmentInCents)
    expect(sut.collectables.length).toBe(0)
    expect(sut.createdAt).toEqual(expect.any(Date))
    expect(sut.updatedAt).toBeUndefined()
  })

  it('should be able to attach a collectables to collection entity', () => {
    const sut = Collection.create({
      name,
      theme,
      ownerId,
      description,
      totalCollectables,
      totalInvestmentInCents,
    })

    const collectableQuantity = 2

    const collectables = Array.from(
      { length: collectableQuantity },
      (_, index) =>
        Collectable.create({
          referenceId: new Identifier('reference-id'),
          name: `name ${index}`,
          description: `description ${index}`,
          ownerId,
          collectionId: new Identifier(sut.id),
        }),
    )

    sut.collectables = collectables

    expect(sut.collectables).toEqual(collectables)
    expect(sut.collectables.length).toEqual(collectableQuantity)
  })
})
