export class UseCaseResult<T> {
  message?: string
  data: T

  constructor(data: T, message?: string) {
    this.message = message
    this.data = data
  }
}
