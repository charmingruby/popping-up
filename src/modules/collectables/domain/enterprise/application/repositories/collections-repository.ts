import { Collection } from '../../entities/collection'

export abstract class CollectionsRepository {
  abstract findByNameAndOwnerId(
    name: string,
    ownerId: string,
  ): Promise<Collection | null>

  abstract create(collection: Collection): Promise<void>
}
