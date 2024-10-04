import { Entity } from '@/core/entities/entity'
import { Tag } from './tag'
import { Identifier } from '@/core/entities/identifier'
import { Optional } from '@/core/types/optional'

interface CollectableProperties {
  name: string
  description: string
  collectionId: Identifier
  referenceId?: Identifier
  createdAt: Date
  updatedAt?: Date | null

  tags: Tag[]
}

export class Collectable extends Entity<CollectableProperties> {
  get name(): string {
    return this.props.name
  }

  get description(): string {
    return this.props.description
  }

  get collectionId(): string {
    return this.props.collectionId.toString
  }

  get referenceId(): string {
    return this.props.referenceId.toString
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  get tags(): Tag[] {
    return this.props.tags
  }

  static create(
    props: Optional<CollectableProperties, 'tags' | 'createdAt'>,
    id?: Identifier,
  ) {
    const collectable = new Collectable(
      {
        ...props,
        tags: props.tags ?? [],
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return collectable
  }
}
