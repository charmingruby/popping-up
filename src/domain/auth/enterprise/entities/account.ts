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
    return this.props.username
  }

  set username(value: string) {
    this.touch()
    this.props.username = value
  }

  get firstName(): string {
    return this.props.firstName
  }

  set firstName(value: string) {
    this.touch()
    this.props.firstName = value
  }

  get lastName(): string {
    return this.props.lastName
  }

  set lastName(value: string) {
    this.touch()
    this.props.lastName = value
  }

  get email(): string {
    return this.props.email
  }

  set email(value: string) {
    this.touch()
    this.props.email = value
  }

  get password(): string {
    return this.props.password
  }

  set password(value: string) {
    this.touch()
    this.props.password = value
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<AccountProperties, 'createdAt'>,
    id?: Identifier,
  ) {
    const account = new Account(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return account
  }
}
