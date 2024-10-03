import { Optional } from '../types/optional'
import { Entity } from './entity'
import { Identifier } from './identifier'

interface RandomProperties {
  value: string
  key: string
}

class RandomEntity extends Entity<RandomProperties> {
  get key(): string {
    return this.Properties.key
  }

  get value(): string {
    return this.Properties.value
  }

  static create(Properties: Optional<RandomProperties, 'key'>, id?: Identifier) {
    const random = new RandomEntity(
      {
        ...Properties,
        key: `key-${Properties.value}`,
      },
      id,
    )

    return random
  }
}

describe('[CORE] Entity', () => {
  it('should be able to create an extended entity from core entity', () => {
    const value = 'test'

    const random = RandomEntity.create({ value })

    expect(random).toBeInstanceOf(RandomEntity)
    expect(random.key).toEqual(`key-${value}`)
    expect(random.value).toEqual(value)
  })
})
