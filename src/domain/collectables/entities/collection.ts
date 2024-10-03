import { Entity } from '@/core/entities/entity'
import { Identifier } from '@/core/entities/identifier'
import { Optional } from '@/core/types/optional'
import { Collectable } from './collectable'
import { Tag } from './tag'

interface CollectionProperties {
  name: string
  theme: string
  description: string
  totalCollectables: number
  totalInvestmentInCents: number
  createdAt: Date
  updatedAt?: Date | null
  collectables: Collectable[]
  tags: Tag[]
}

export class Collection extends Entity<CollectionProperties> {
  get name(): string {
    return this.props.name
  }

  get theme(): string {
    return this.props.theme
  }

  get description(): string {
    return this.props.description
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

  get collectables(): Collectable[] {
    return this.props.collectables
  }

  get tags(): Tag[] {
    return this.props.tags
  }

  static create(
    props: Optional<
      CollectionProperties,
      | 'collectables'
      | 'tags'
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
        tags: props.tags ?? [],
      },
      id,
    )

    return collection
  }
}
