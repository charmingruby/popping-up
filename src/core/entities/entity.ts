import { Identifier } from './identifier'

export class Entity<Properties> {
  private _id: Identifier
  protected Properties: Properties

  get id(): string {
    return this._id.toString
  }

  protected constructor(Properties: Properties, id?: Identifier) {
    this._id = id ?? new Identifier()
    this.Properties = Properties
  }
}
