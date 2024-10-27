import { Collection } from '../../enterprise/entities/collection.entity'

export abstract class CollectionsRepository {
  abstract findByNameAndOwnerId(
    name: string,
    ownerId: string,
  ): Promise<Collection | null>

  abstract findByIdAndOwnerId(
    ownerId: string,
    collectionId: string,
  ): Promise<Collection | null>

  abstract findManyByOwnerId(ownerId: string): Promise<Collection[]>

  abstract create(collection: Collection): Promise<void>
  abstract save(collection: Collection): Promise<void>
}
