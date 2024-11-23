import vine from '@vinejs/vine'

const UserValidator = vine.compile({
  email: vine.string().email().unique({ table: 'users', column: 'email' }),
  password: vine.string(),
  nom: vine.string(),
  prenom: vine.string(),
  date_naiss: vine.string(),
  lieu_naiss: vine.string(),
  pays: vine.string(),
  ville: vine.string(),
  addresse: vine.string(),
  telephone: vine.string(),
  pieceID: vine.string(),
  profession: vine.string(),
  revenue: vine.string(),
  type_compte: vine.string(),
  pin: vine.string(),
  solde_compte: vine.number(),
  solde_carte: vine.number(),
  accountnumber: vine.number(),
  cvv: vine.number(),
  cartenumber: vine.number(),

})

export default UserValidator
