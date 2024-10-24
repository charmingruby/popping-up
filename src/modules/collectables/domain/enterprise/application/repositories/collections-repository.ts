import { Collection } from '../../entities/collection'

export abstract class CollectionsRepository {
  abstract findByNameAndOwnerId(
    name: string,
    ownerId: string,
  ): Promise<Collection | null>

  abstract findByIdAndOwnerId(
    ownerId: string,
    collectionId: string,
  ): Promise<Collection | null>

  abstract create(collection: Collection): Promise<void>
  abstract save(collection: Collection): Promise<void>
}
