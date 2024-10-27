import { faker } from '@faker-js/faker'

import { Identifier } from '@/common/core/entities/identifier.entity'
import {
  Reference,
  ReferenceProperties,
} from '@/modules/collectables/domain/enterprise/entities/reference.entity'

export function makeReference(
  override: Partial<ReferenceProperties> = {},
  id?: Identifier,
) {
  const reference = Reference.create(
    {
      title: faker.commerce.productName(),
      observation: faker.commerce.productDescription(),
      priceInCents: 10000,
      url: faker.internet.url(),
      ...override,
    },
    id,
  )

  return reference
}
