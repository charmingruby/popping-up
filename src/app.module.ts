import { Module } from '@nestjs/common'
import { ConfigModule, ConfigType } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

import { POSTGRES_DATASOURCE } from './common/constants/datasource'
import databaseConfig from './config/database.config'
import { validateEnvironment } from './config/environment-validation'
import { AuthModule } from './modules/auth/auth.module'
import { Account } from './modules/auth/domain/enterprise/entities/account'
import { AuthGuard } from './modules/auth/infra/security/auth/guards/auth.guard'

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      validationSchema: validateEnvironment(),
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [databaseConfig],
        }),
      ],
      useFactory: (
        configService: ConfigType<typeof databaseConfig>,
      ): TypeOrmModuleOptions => ({
        entities: [Account],
        type: POSTGRES_DATASOURCE,
        autoLoadEntities: configService.autoLoadEntities,
        synchronize: configService.synchronize,
        port: +configService.port,
        username: configService.username,
        password: configService.password,
        host: configService.host,
        database: configService.database,
      }),
      inject: [databaseConfig.KEY],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
