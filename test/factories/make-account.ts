import { faker } from '@faker-js/faker'

import { Identifier } from '@/common/core/entities/identifier.entity'
import {
  Account,
  AccountProperties,
} from '@/modules/auth/domain/enterprise/entities/account'

export function makeAccount(
  override: Partial<AccountProperties> = {},
  id?: Identifier,
) {
  const account = Account.create(
    {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return account
}
