import { Body, Controller, Post } from '@nestjs/common'

import {
  CurrentUser,
  CurrentUserPayload,
} from '@/common/decorators/current-user'

import { CreateCollectionDto } from '../dto/create-collection.dto'

@Controller()
export class CreateCollectionController {
  @Post('/collections')
  async createCollection(
    @Body() dto: CreateCollectionDto,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return { dto, user }
  }
}
