import { Account } from './account'

describe('[ACCOUNTS] Account Entity', () => {
  const username = 'john_doe'
  const firstName = 'John'
  const lastName = 'Doe'
  const email = 'john@doe.com'
  const password = 'password123'

  it('should create an account entity', () => {
    const account = Account.create({
      username,
      firstName,
      lastName,
      email,
      password,
    })

    expect(account).toBeDefined()
    expect(account.username).toBe(username)
    expect(account.firstName).toBe(firstName)
    expect(account.lastName).toBe(lastName)
    expect(account.email).toBe(email)
    expect(account.password).toBe(password)
  })
})
