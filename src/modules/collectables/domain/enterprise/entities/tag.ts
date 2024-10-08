import { Entity } from '@/common/core/entities/entity'
import { Identifier } from '@/common/core/entities/identifier'
import { Optional } from '@/common/core/types/optional'

import { Collectable } from './collectable'

export interface TagProperties {
  name: string
  description: string
  collectionId: Identifier
  createdAt: Date
  updatedAt?: Date | null

  collectables: Collectable[]
}

export class Tag extends Entity<TagProperties> {
  get name(): string {
    return this.props.name
  }

  get description(): string {
    return this.props.description
  }

  get collectionId(): string {
    return this.props.collectionId.toString
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  get collectables(): Collectable[] {
    return this.props.collectables
  }

  static create(
    props: Optional<TagProperties, 'createdAt' | 'collectables'>,
    id?: Identifier,
  ) {
    const tag = new Tag(
      {
        ...props,
        collectables: props.collectables ?? [],
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return tag
  }
}
