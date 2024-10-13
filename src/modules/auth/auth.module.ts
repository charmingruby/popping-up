import { Module } from '@nestjs/common'
import { ConfigModule, ConfigType } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import jwtConfig from '@/config/jwt.config'

import { AuthHttpModule } from './infra/http/auth-http.module'

@Module({
  imports: [
    AuthHttpModule,
    JwtModule.registerAsync({
      global: true,
      imports: [
        ConfigModule.forRoot({
          load: [jwtConfig],
          isGlobal: true,
        }),
      ],
      useFactory(configService: ConfigType<typeof jwtConfig>) {
        return {
          secret: configService.secretKey,
        }
      },
      inject: [jwtConfig.KEY],
    }),
  ],
})
export class AuthModule {}
