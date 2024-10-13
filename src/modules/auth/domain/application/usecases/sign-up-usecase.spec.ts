import { makeAccount } from 'test/factories/make-account'
import { FakeHasher } from 'test/fake/hasher'
import { InMemoryAccountsRepository } from 'test/repositories/in-memory-accounts-repository'

import { ConflictError } from '../errors/conflict-error'
import { SignUpParams } from '../gateways/sign-up-gateway'
import { SignUpUseCase } from './sign-up-usecase'

let fakeHasher: FakeHasher
let inMemoryAccountRepository: InMemoryAccountsRepository
let sut: SignUpUseCase

describe('[ACCOUNTS] Sign Up Use Case', () => {
  beforeEach(() => {
    fakeHasher = new FakeHasher()
    inMemoryAccountRepository = new InMemoryAccountsRepository()
    sut = new SignUpUseCase(inMemoryAccountRepository, fakeHasher)
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
        accountId: expect.any(String),
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
