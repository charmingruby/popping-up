import { Identifier } from './identifier.entity'

export class Entity<Properties> {
  private _id: Identifier
  protected props: Properties

  get id(): string {
    return this._id.toString
  }

  protected constructor(props: Properties, id?: Identifier) {
    this._id = id ?? new Identifier()
    this.props = props
  }
}
