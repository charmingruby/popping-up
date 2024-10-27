import { Module } from '@nestjs/common'

import { CollectablesRestModule } from './infra/http/rest/collectables-rest.module'

@Module({
  imports: [CollectablesRestModule],
})
export class CollectablesModule {}
