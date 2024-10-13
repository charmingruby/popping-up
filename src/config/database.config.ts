import { registerAs } from '@nestjs/config'

export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST || 'localhost',
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'postgres',
  port: +process.env.DATABASE_PORT || 5432,
  synchronize: process.env.DATABASE_SYNC === 'true',
  autoLoadEntities: process.env.DATABASE_AUTOLOAD === 'true',
}))
