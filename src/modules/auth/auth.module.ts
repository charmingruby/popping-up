import { Module } from '@nestjs/common'
import { ConfigModule, ConfigType } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'

import jwtConfig from '@/config/jwt.config'

import { AuthHttpModule } from './infra/http/auth-http.module'
import { AuthGuard } from './infra/security/auth/guards/auth.guard'

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
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
