import { Collectable } from '../../enterprise/entities/collectable'

export abstract class CollectablesRepository {
  abstract create(collectable: Collectable): Promise<void>
  abstract findByNameAndCollectionId(
    name: string,
    collectionId: string,
  ): Promise<Collectable | null>

  abstract findByIdAndCollectionId(
    collectableId: string,
    collectionId: string,
  ): Promise<Collectable | null>

  abstract findByIdAndOwnerId(
    collectableId: string,
    ownerId: string,
  ): Promise<Collectable | null>

  abstract findManyByOwnerIdAndCollectionId(
    ownerId: string,
    collectionId: string,
  ): Promise<Collectable[]>

  abstract save(collectable: Collectable): Promise<void>
}
