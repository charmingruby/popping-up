import { plainToInstance } from 'class-transformer'
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator'

class Env {
  @IsString()
  @IsNotEmpty()
  databaseHost = 'localhost'

  @IsString()
  @IsNotEmpty()
  databaseUser = 'postgres'

  @IsString()
  @IsNotEmpty()
  databasePassword = 'postgres'

  @IsString()
  @IsNotEmpty()
  databaseName = 'postgres'

  @IsNumber()
  @IsNotEmpty()
  databasePort = 5432

  @IsBoolean()
  @IsNotEmpty()
  databaseSync = true

  @IsBoolean()
  @IsNotEmpty()
  databaseAutoLoad = true
}

const env: Env = plainToInstance(Env, {
  databaseHost: process.env.DATABASE_HOST,
  databaseUser: process.env.DATABASE_USER,
  databasePassword: process.env.DATABASE_PASSWORD,
  databaseName: process.env.DATABASE_NAME,
  databasePort: +process.env.DATABASE_PORT,
  databaseSync: process.env.DATABASE_SYNC === 'true',
  databaseAutoLoad: process.env.DATABASE_AUTOLOAD === 'true',
})

export const validateEnvironment = () => {
  const errors = validateSync(env)

  if (errors.length > 0) {
    throw new Error(JSON.stringify(errors, null, 2))
  }
}
