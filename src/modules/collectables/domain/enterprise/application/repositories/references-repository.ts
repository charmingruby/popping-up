import { Reference } from '../../entities/reference'

export abstract class ReferencesRepository {
  abstract create(reference: Reference): Promise<void>
  abstract findByTitle(title: string): Promise<Reference | null>
}
