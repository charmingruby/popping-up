import { faker } from '@faker-js/faker'

import { Identifier } from '@/core/entities/identifier'
import {
  Account,
  AccountProperties,
} from '@/domain/accounts/enterprise/entities/account'

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
