import { Entity } from '@/common/core/entities/base.entity'
import { Identifier } from '@/common/core/entities/identifier.entity'
import { Optional } from '@/common/core/types/optional'

import { Reference } from './reference'

export type CollectableStatus = 'ACQUIRED' | 'PENDING' | 'CANCELED'

export interface CollectableProperties {
  name: string
  description: string
  collectionId: Identifier
  referenceId: Identifier
  ownerId: Identifier
  status: CollectableStatus
  createdAt: Date
  updatedAt?: Date | null

  reference?: Reference
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

  get ownerId(): string {
    return this.props.ownerId.toString
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

  get reference() {
    return this.props.reference
  }

  set reference(reference: Reference) {
    this.props.reference = reference
  }

  static create(
    props: Optional<CollectableProperties, 'status' | 'createdAt'>,
    id?: Identifier,
  ) {
    const collectable = new Collectable(
      {
        ...props,
        status: props.status ?? 'PENDING',
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return collectable
  }
}
