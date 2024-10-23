import { Entity } from '@/common/core/entities/base.entity'
import { Identifier } from '@/common/core/entities/identifier.entity'
import { Optional } from '@/common/core/types/optional'

export interface ReferenceProperties {
  title: string
  observation: string
  url: string
  priceInCents: number
  createdAt: Date
  updatedAt?: Date | null
}

export class Reference extends Entity<ReferenceProperties> {
  get title(): string {
    return this.props.title
  }

  get observation(): string {
    return this.props.observation
  }

  get url(): string {
    return this.props.url
  }

  get priceInCents(): number {
    return this.props.priceInCents
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  static create(
    props: Optional<ReferenceProperties, 'createdAt'>,
    id?: Identifier,
  ) {
    const reference = new Reference(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return reference
  }
}
