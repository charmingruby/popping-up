import { ReferencesRepository } from '@/modules/collectables/domain/application/repositories/references.repository'
import { Reference } from '@/modules/collectables/domain/enterprise/entities/reference.entity'

export class InMemoryReferencesRepository implements ReferencesRepository {
  public items: Reference[] = []

  async save(reference: Reference): Promise<void> {
    const index = this.items.findIndex((c) => c.id === reference.id)

    if (index !== -1) {
      this.items[index] = reference
    } else {
      this.items.push(reference)
    }
  }

  async findByTitle(title: string): Promise<Reference | null> {
    const reference = this.items.find((c) => c.title === title)

    if (!reference) {
      return null
    }

    return reference
  }

  async findById(id: string): Promise<Reference | null> {
    const reference = this.items.find((c) => c.id === id)

    if (!reference) {
      return null
    }

    return reference
  }

  async create(reference: Reference): Promise<void> {
    this.items.push(reference)
  }
}
