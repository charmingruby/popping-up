import { Account } from './account.entity'

describe('[ACCOUNTS] Account Entity', () => {
  const username = 'john_doe'
  const firstName = 'John'
  const lastName = 'Doe'
  const email = 'john@doe.com'
  const password = 'password123'

  it('should create an account entity', () => {
    const sut = Account.create({
      username,
      firstName,
      lastName,
      email,
      password,
    })

    expect(sut).toBeDefined()
    expect(sut.username).toBe(username)
    expect(sut.firstName).toBe(firstName)
    expect(sut.lastName).toBe(lastName)
    expect(sut.email).toBe(email)
    expect(sut.password).toBe(password)
  })
})
