export interface HasherPort {
  hash(value: string): string
  compare(value: string, hash: string): boolean
}
