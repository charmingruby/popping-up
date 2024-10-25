import { faker } from '@faker-js/faker'

import { Identifier } from '@/common/core/entities/identifier.entity'
import {
  Collectable,
  CollectableProperties,
} from '@/modules/collectables/domain/enterprise/entities/collectable'

export function makeCollectable(
  override: Partial<CollectableProperties> = {},
  id?: Identifier,
) {
  const collectable = Collectable.create(
    {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      collectionId: new Identifier('collectable-id'),
      referenceId: new Identifier('reference-id'),
      status: 'PENDING',
      ...override,
    },
    id,
  )

  return collectable
}
