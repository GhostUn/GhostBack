import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nom: string | null

  @column()
  declare prenom: string | null

  @column()
  declare password: string | null

  @column()
  declare date_naiss: string | null

  @column()
  declare lieu_naiss: string | null

  @column()
  declare pays: string | null

  @column()
  declare ville: string | null

  @column()
  declare addresse: string | null

  @column()
  declare telephone: string | null

  @column()
  declare pieceID: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare profession: string
  
  @column({ serializeAs: null })
  declare revenue: number

  @column({ serializeAs: null })
  declare type_compte: string

  @column({ serializeAs: null })
  declare pin: string

  @column({ serializeAs: null })
  declare solde_compte: number

  @column({ serializeAs: null })
  declare solde_carte: number

  @column({ serializeAs: null })
  declare accountnumber: number

  @column({ serializeAs: null })
  declare cvv: number

  @column({ serializeAs: null })
  declare cartenumber: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)
}