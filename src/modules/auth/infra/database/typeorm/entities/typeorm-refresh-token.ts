import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

import { TypeOrmAccount } from './typeorm-account'

@Entity({ name: 'refresh_tokens' })
export class TypeOrmRefreshToken {
  @PrimaryColumn({
    name: 'id',
    nullable: false,
    unique: true,
    type: 'varchar',
  })
  id: string

  @Column({
    name: 'issued_at',
    type: 'timestamp',
  })
  issuedAt: Date

  @Column({
    name: 'expires_at',
    type: 'timestamp',
  })
  expiresAt: Date

  @Column({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
  })
  createdAt: Date

  @ManyToOne(() => TypeOrmAccount, (account) => account.refreshTokens)
  @JoinColumn({ name: 'account_id' })
  account: TypeOrmAccount
}
