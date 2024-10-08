import { Either, left, right } from './either'

function doSomeThing(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return right(10)
  } else {
    return left('error')
  }
}

describe('[CORE] Either', () => {
  it('success result', () => {
    const sut = doSomeThing(true)

    expect(sut.isRight()).toBe(true)
    expect(sut.isLeft()).toBe(false)
  })

  it('error result', () => {
    const sut = doSomeThing(false)

    expect(sut.isLeft()).toBe(true)
    expect(sut.isRight()).toBe(false)
  })
})
