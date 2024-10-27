import { Reference } from './reference.entity'

describe('[COLLECTABLES] References Entity', () => {
  const title = 'reference title'
  const observation = 'reference observation'
  const url = 'reference url'
  const priceInCents = 10000

  it('should create a reference entity', () => {
    const sut = Reference.create({
      title,
      observation,
      url,
      priceInCents,
    })

    expect(sut).toBeDefined()
    expect(sut.title).toEqual(title)
    expect(sut.observation).toEqual(observation)
    expect(sut.url).toEqual(url)
    expect(sut.priceInCents).toEqual(priceInCents)
    expect(sut.createdAt).toEqual(expect.any(Date))
    expect(sut.updatedAt).toBeUndefined()
  })
})
