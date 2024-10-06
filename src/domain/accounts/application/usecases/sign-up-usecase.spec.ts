import { FakeHasher } from 'test/fake/hasher'
import { InMemoryAccountsRepository } from 'test/repositories/in-memory-accounts-repository'
import { SignUpCase } from './sign-up-usecase'
import { SignUpParams } from '../gateways/sign-up-gateway'
import { ConflictError } from '../errors/conflict-error'
import { makeAccount } from 'test/factories/make-account'

let fakeHasher: FakeHasher
let inMemoryAccountRepository: InMemoryAccountsRepository
let sut: SignUpCase

describe('[ACCOUNTS] Sign Up Use Case', () => {
  beforeEach(() => {
    fakeHasher = new FakeHasher()
    inMemoryAccountRepository = new InMemoryAccountsRepository()
    sut = new SignUpCase(inMemoryAccountRepository, fakeHasher)
  })
  const username = 'john_doe'
  const firstName = 'John'
  const lastName = 'Doe'
  const email = 'john@doe.com'
  const password = 'password123'

  it('should be able to create a new account', async () => {
    const input: SignUpParams = {
      username,
      firstName,
      lastName,
      email,
      password,
    }

    const result = await sut.perform(input)

    expect(result.isLeft()).toBeFalsy()
    expect(result.isRight()).toBeTruthy()
    expect(result.value).toMatchObject({
      accountPayload: expect.objectContaining({
        username,
        email,
      }),
    })
  })

  it('should be not able to create an account with conflict email', async () => {
    await inMemoryAccountRepository.create(makeAccount({ email }))

    const input: SignUpParams = {
      username,
      firstName,
      lastName,
      email,
      password,
    }

    const result = await sut.perform(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toBeInstanceOf(ConflictError)
  })

  it('should be not able to create an account with conflict username', async () => {
    await inMemoryAccountRepository.create(makeAccount({ username }))

    const input: SignUpParams = {
      username,
      firstName,
      lastName,
      email,
      password,
    }

    const result = await sut.perform(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toBeInstanceOf(ConflictError)
  })
})
