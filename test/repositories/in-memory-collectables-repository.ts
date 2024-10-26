import { CollectablesRepository } from '@/modules/collectables/domain/application/repositories/collectables-repository'
import { Collectable } from '@/modules/collectables/domain/enterprise/entities/collectable'

export class InMemoryCollectablesRepository implements CollectablesRepository {
  public items: Collectable[] = []

  async findManyByOwnerIdAndCollectionId(
    ownerId: string,
    collectionId: string,
  ): Promise<Collectable[]> {
    return this.items.filter(
      (c) => c.ownerId === ownerId && c.collectionId === collectionId,
    )
  }

  async save(collectable: Collectable): Promise<void> {
    const index = this.items.findIndex((c) => c.id === collectable.id)

    if (index !== -1) {
      this.items[index] = collectable
    } else {
      this.items.push(collectable)
    }
  }

  async findByIdAndOwnerId(
    collectableId: string,
    ownerId: string,
  ): Promise<Collectable | null> {
    const collectable = this.items.find(
      (c) => c.id === collectableId && c.ownerId === ownerId,
    )

    if (!collectable) {
      return null
    }

    return collectable
  }

  async findByIdAndCollectionId(
    collectableId: string,
    collectionId: string,
  ): Promise<Collectable | null> {
    const collectable = this.items.find(
      (c) => c.id === collectableId && c.collectionId === collectionId,
    )

    if (!collectable) {
      return null
    }

    return collectable
  }

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
