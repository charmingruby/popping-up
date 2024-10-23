import { faker } from '@faker-js/faker'

import { Identifier } from '@/common/core/entities/identifier.entity'
import {
  Collection,
  CollectionProperties,
} from '@/modules/collectables/domain/enterprise/entities/collection'

export function makeCollection(
  override: Partial<CollectionProperties> = {},
  id?: Identifier,
) {
  const collection = Collection.create(
    {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      theme: faker.commerce.productMaterial(),
      ownerId: new Identifier('collection-id'),
      ...override,
    },
    id,
  )

  return collection
}
