import { Module } from '@nestjs/common'
import { ConfigModule, ConfigType } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

import { postgresDataSource } from './common/constants/datasource'
import databaseConfig from './config/database.config'
import { validateEnvironment } from './config/environment-validation'
import { AuthModule } from './modules/auth/auth.module'
import { Account } from './modules/auth/domain/enterprise/entities/account'

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [databaseConfig],
          validationSchema: validateEnvironment(),
          isGlobal: true,
        }),
      ],
      useFactory: (
        configService: ConfigType<typeof databaseConfig>,
      ): TypeOrmModuleOptions => ({
        entities: [Account],
        type: postgresDataSource,
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
})
export class AppModule {}
