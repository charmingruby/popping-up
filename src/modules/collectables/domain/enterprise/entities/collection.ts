import { Entity } from '@/common/core/entities/base.entity'
import { Identifier } from '@/common/core/entities/identifier.entity'
import { Optional } from '@/common/core/types/optional'

import { Collectable } from './collectable'

export interface CollectionProperties {
  name: string
  ownerId: Identifier
  theme: string
  description: string
  totalCollectables: number
  totalInvestmentInCents: number
  createdAt: Date
  updatedAt?: Date | null

  collectables: Collectable[]
}

export class Collection extends Entity<CollectionProperties> {
  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get theme(): string {
    return this.props.theme
  }

  set theme(theme: string) {
    this.props.theme = theme
  }

  get description(): string {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
  }

  get totalCollectables(): number {
    return this.props.totalCollectables
  }

  get totalInvestmentInCents(): number {
    return this.props.totalInvestmentInCents
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  get ownerId(): string {
    return this.props.ownerId.toString
  }

  get collectables(): Collectable[] {
    return this.props.collectables
  }

  set collectables(collectables: Collectable[]) {
    this.props.collectables = collectables
  }

  static create(
    props: Optional<
      CollectionProperties,
      | 'collectables'
      | 'totalCollectables'
      | 'totalInvestmentInCents'
      | 'createdAt'
    >,
    id?: Identifier,
  ) {
    const collection = new Collection(
      {
        ...props,
        totalInvestmentInCents: props.totalInvestmentInCents ?? 0,
        totalCollectables: props.totalCollectables ?? 0,
        createdAt: props.createdAt ?? new Date(),
        collectables: props.collectables ?? [],
      },
      id,
    )

    return collection
  }
}
