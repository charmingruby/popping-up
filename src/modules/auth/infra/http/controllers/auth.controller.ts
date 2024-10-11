import { Controller, Post } from '@nestjs/common'

import { AccountsRepository } from '@/modules/auth/domain/application/repositories/accounts-repository'

@Controller('/auth')
export class AuthController {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  @Post('/signup')
  async signUp() {}

  @Post('/signin')
  async signIn() {}

  @Post('/refresh')
  async refresh() {}

  @Post('/logout')
  async logout() {}
}
