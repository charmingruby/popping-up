import { Reference } from '../../enterprise/entities/reference.entity'

export abstract class ReferencesRepository {
  abstract create(reference: Reference): Promise<void>
  abstract findByTitle(title: string): Promise<Reference | null>
  abstract findById(id: string): Promise<Reference | null>
  abstract save(reference: Reference): Promise<void>
}
