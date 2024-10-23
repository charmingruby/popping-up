import { Entity } from '@/common/core/entities/base.entity'
import { Identifier } from '@/common/core/entities/identifier.entity'
import { Optional } from '@/common/core/types/optional'

import { Tag } from './tag'

export type CollectableStatus = 'ACQUIRED' | 'PENDING' | 'CANCELED'

interface CollectableProperties {
  name: string
  description: string
  collectionId: Identifier
  referenceId?: Identifier
  status: CollectableStatus
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

  get status(): CollectableStatus {
    return this.props.status
  }

  set status(status: CollectableStatus) {
    this.props.status = status
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

  set tags(tags: Tag[]) {
    this.props.tags = tags
  }

  static create(
    props: Optional<CollectableProperties, 'tags' | 'status' | 'createdAt'>,
    id?: Identifier,
  ) {
    const collectable = new Collectable(
      {
        ...props,
        status: props.status ?? 'PENDING',
        tags: props.tags ?? [],
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return collectable
  }
}
