import { Collectable } from '../../entities/collectable'

export abstract class CollectablesRepository {
  abstract create(collectable: Collectable): Promise<void>
  abstract findByNameAndCollectionId(
    name: string,
    collectionId: string,
  ): Promise<Collectable | null>
}
