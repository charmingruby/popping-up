import { CollectablesRepository } from '@/modules/collectables/domain/enterprise/application/repositories/collectables-repository'
import { Collectable } from '@/modules/collectables/domain/enterprise/entities/collectable'

export class InMemoryCollectablesRepository implements CollectablesRepository {
  public items: Collectable[] = []

  async findByNameAndCollectionId(
    name: string,
    collectionId: string,
  ): Promise<Collectable | null> {
    const collectable = this.items.find(
      (c) => c.name === name && c.collectionId === collectionId,
    )

    if (!collectable) {
      return null
    }

    return collectable
  }

  async create(collectable: Collectable): Promise<void> {
    this.items.push(collectable)
  }
}
