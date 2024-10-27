import { Module } from '@nestjs/common'

import { CreateCollectionController } from './controllers/create-collection.controller'

@Module({
  controllers: [CreateCollectionController],
})
export class CollectablesRestModule {}
