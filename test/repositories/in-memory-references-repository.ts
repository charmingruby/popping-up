import { ReferencesRepository } from '@/modules/collectables/domain/enterprise/application/repositories/references-repository'
import { Reference } from '@/modules/collectables/domain/enterprise/entities/reference'

export class InMemoryReferencesRepository implements ReferencesRepository {
  public items: Reference[] = []

  async findByTitle(title: string): Promise<Reference | null> {
    const reference = this.items.find((c) => c.title === title)

    if (!reference) {
      return null
    }

    return reference
  }

  async create(reference: Reference): Promise<void> {
    this.items.push(reference)
  }
}
