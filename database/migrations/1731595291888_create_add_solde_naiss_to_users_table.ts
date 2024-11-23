import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      
      table.integer('solde_compte')
      table.integer('solde_carte')
      table.integer('accountnumber')
      table.integer('cvv')
      table.integer('cartenumber')
      
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}