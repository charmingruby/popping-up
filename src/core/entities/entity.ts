import { Identifier } from './identifier';

export class Entity<Props> {
  private _id: Identifier;
  protected props: Props;

  get id(): string {
    return this._id.toString;
  }

  protected constructor(props: Props, id?: Identifier) {
    this._id = id ?? new Identifier();
    this.props = props;
  }
}
