import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'

import { TypeOrmRefreshToken } from './typeorm-refresh-token'

@Entity({ name: 'accounts' })
export class TypeOrmAccount {
  @PrimaryColumn({
    name: 'id',
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  id: string

  @Column({
    name: 'username',
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  username: string

  @Column({
    name: 'first_name',
    type: 'varchar',
    nullable: false,
  })
  firstName: string

  @Column({
    name: 'last_name',
    type: 'varchar',
    nullable: false,
  })
  lastName: string

  @Column({
    name: 'email',
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  email: string

  @Column({
    name: 'password',
    type: 'varchar',
    nullable: false,
  })
  password: string

  @Column({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
  })
  createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date

  @OneToMany(() => TypeOrmRefreshToken, (refreshToken) => refreshToken.account)
  refreshTokens: TypeOrmRefreshToken[]
}
