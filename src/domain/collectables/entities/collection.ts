import { Entity } from '@/core/entities/entity'
import { Identifier } from '@/core/entities/identifier'
import { Optional } from '@/core/types/optional'
import { Collectable } from './collectable'

interface CollectionProperties {
  name: string
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
    return this.Properties.name
  }

  get theme(): string {
    return this.Properties.theme
  }

  get description(): string {
    return this.Properties.description
  }

  get totalCollectables(): number {
    return this.Properties.totalCollectables
  }

  get totalInvestmentInCents(): number {
    return this.Properties.totalInvestmentInCents
  }

  get createdAt(): Date {
    return this.Properties.createdAt
  }

  get updatedAt(): Date | null | undefined {
    return this.Properties.updatedAt
  }

  get collectables(): Collectable[] {
    return this.Properties.collectables
  }

  static create(
    Properties: Optional<
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
        ...Properties,
        totalInvestmentInCents: Properties.totalInvestmentInCents ?? 0,
        totalCollectables: Properties.totalCollectables ?? 0,
        createdAt: Properties.createdAt ?? new Date(),
        collectables: Properties.collectables ?? [],
      },
      id,
    )

    return collection
  }
}
