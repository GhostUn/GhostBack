import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.date('date_naiss').notNullable() // Ajout de la colonne date_naiss
      table.string('nom').notNullable()
      table.string('prenom').notNullable()
      
      table.string('lieu_naiss')
      table.string('pays')
      table.string('ville')
      table.string('addresse')
      table.string('telephone')
      table.string('pieceID')
      table.string('profession')
      table.integer('revenue')
      table.string('type_compte')
      table.string('pin')

      table.integer('solde_compte')
      table.integer('solde_carte')
      table.integer('accountnumber')
      table.integer('cvv')
      table.integer('cartenumber')
     
    })
  }
  

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      
      // Suppression de la colonne en cas de rollback
    })
  }
}