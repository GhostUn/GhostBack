import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'add_column_tos'

  public async up () {
    this.schema.alterTable('users', (table) => {
        
      table.string('nom').notNullable()
      table.string('prenom').notNullable()
      table.string('date_naiss').notNullable()
      table.string('lieu_naiss').notNullable()
      table.string('pays').notNullable()
      table.string('ville').notNullable()
      table.string('Addresse').notNullable()
      table.string('telephone').notNullable()
      table.string('pieceID').notNullable()
      table.string('profession').notNullable()
      table.string('revenue').notNullable()
      table.string('type_compte').notNullable()
      table.string('pin')
    });
}

  async down() {
    this.schema.dropTable(this.tableName)
  }
}