import { CollectionsRepository } from '@/modules/collectables/domain/enterprise/application/repositories/collections-repository'
import { Collection } from '@/modules/collectables/domain/enterprise/entities/collection'

export class InMemoryCollectionsRepository implements CollectionsRepository {
  public items: Collection[] = []

  async findByNameAndOwnerId(
    name: string,
    ownerId: string,
  ): Promise<Collection | null> {
    const collection = this.items.find(
      (c) => c.name === name && c.ownerId === ownerId,
    )

    if (!collection) {
      return null
    }

    return collection
  }

  async save(collection: Collection): Promise<void> {
    const index = this.items.findIndex((c) => c.id === collection.id)

    if (index === -1) {
      return null
    }

    this.items[index] = collection
  }

  async findByIdAndOwnerId(
    ownerId: string,
    collectionId: string,
  ): Promise<Collection | null> {
    const collection = this.items.find(
      (c) => c.ownerId === ownerId && c.id === collectionId,
    )

    if (!collection) {
      return null
    }

    return collection
  }

  async create(collection: Collection): Promise<void> {
    this.items.push(collection)
  }
}
