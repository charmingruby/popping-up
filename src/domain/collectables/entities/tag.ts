import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { Identifier } from '@/core/entities/identifier'

export interface TagProperties {
  name: string
  description: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Tag extends Entity<TagProperties> {
  get name(): string {
    return this.props.name
  }

  get description(): string {
    return this.props.description
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  static create(props: Optional<TagProperties, 'createdAt'>, id?: Identifier) {
    const tag = new Tag(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return tag
  }
}
