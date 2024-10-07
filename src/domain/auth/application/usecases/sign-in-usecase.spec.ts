import { makeAccount } from 'test/factories/make-account'
import { FakeHasher } from 'test/fake/hasher'
import { InMemoryAccountsRepository } from 'test/repositories/in-memory-accounts-repository'

import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { SignInParams } from '../gateways/sign-in-gateway'
import { SignInUseCase } from './sign-in-usecase'

let fakeHasher: FakeHasher
let inMemoryAccountRepository: InMemoryAccountsRepository
let sut: SignInUseCase

describe('[ACCOUNTS] Sign In Use Case', async () => {
  beforeEach(() => {
    fakeHasher = new FakeHasher()
    inMemoryAccountRepository = new InMemoryAccountsRepository()
    sut = new SignInUseCase(inMemoryAccountRepository, fakeHasher)
  })

  const username = 'john_doe'
  const email = 'john@doe.com'
  const password = 'password123'

  it('should be able to create a new account', async () => {
    const passworHash = await fakeHasher.hash(password)

    const account = makeAccount({ username, email, password: passworHash })

    await inMemoryAccountRepository.create(account)

    const input: SignInParams = {
      email,
      password,
    }

    const result = await sut.perform(input)

    expect(result.isLeft()).toBeFalsy()
    expect(result.isRight()).toBeTruthy()
    expect(result.value).toMatchObject({
      accountPayload: expect.objectContaining({
        email,
        username,
      }),
    })
  })

  it('should be not able to sign in in an account with invalid email', async () => {
    const input: SignInParams = {
      email,
      password,
    }

    const result = await sut.perform(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be not able to sign in in an account with invalid password', async () => {
    const passworHash = await fakeHasher.hash(password)

    const account = makeAccount({ username, email, password: passworHash })

    await inMemoryAccountRepository.create(account)

    const input: SignInParams = {
      email,
      password: `invalid-${password}`,
    }

    const result = await sut.perform(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toBeInstanceOf(InvalidCredentialsError)
  })
})
