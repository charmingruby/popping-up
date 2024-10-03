import { ulid } from 'ulid';

export class Identifier {
  private _id: string;

  public get toString(): string {
    return this._id;
  }

  constructor(id?: string) {
    this._id = id ?? ulid();
  }
}
