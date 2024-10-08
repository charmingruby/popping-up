import { Identifier } from './identifier'

describe('[CORE] Identifier', () => {
  it('should be able to create an identifier without value', () => {
    const sut = new Identifier()

    expect(sut.toString).toBeDefined()
    expect(sut.toString.length).toBeGreaterThan(4)
  })

  it('should be able to create an identifier with value', () => {
    const value = 'id'

    const sut = new Identifier(value)

    expect(sut.toString).toBeDefined()
    expect(sut.toString).toEqual(value)
  })
})
