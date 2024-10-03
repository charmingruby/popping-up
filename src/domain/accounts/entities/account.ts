import { Entity } from '@/core/entities/entity'
import { Identifier } from '@/core/entities/identifier'
import { Optional } from '@/core/types/optional'

export interface AccountProperties {
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Account extends Entity<AccountProperties> {
  get username(): string {
    return this.Properties.username
  }

  set username(value: string) {
    this.touch()
    this.Properties.username = value
  }

  get firstName(): string {
    return this.Properties.firstName
  }

  set firstName(value: string) {
    this.touch()
    this.Properties.firstName = value
  }

  get lastName(): string {
    return this.Properties.lastName
  }

  set lastName(value: string) {
    this.touch()
    this.Properties.lastName = value
  }

  get email(): string {
    return this.Properties.email
  }

  set email(value: string) {
    this.touch()
    this.Properties.email = value
  }

  get password(): string {
    return this.Properties.password
  }

  set password(value: string) {
    this.touch()
    this.Properties.password = value
  }

  get createdAt(): Date {
    return this.Properties.createdAt
  }

  get updatedAt(): Date | null | undefined {
    return this.Properties.updatedAt
  }

  touch() {
    this.Properties.updatedAt = new Date()
  }

  static create(Properties: Optional<AccountProperties, 'createdAt'>, id?: Identifier) {
    const account = new Account(
      {
        ...Properties,
        createdAt: Properties.createdAt ?? new Date(),
      },
      id,
    )

    return account
  }
}
