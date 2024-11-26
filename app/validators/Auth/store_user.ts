import { schema, rules } from '@ioc:Adonis/Core/Validator';

const userSchema = schema.create({
  email: schema.string({}, [
    rules.email(),
    rules.unique({ table: 'users', column: 'email' }),
  ]),
  password: schema.string(),
  nom: schema.string(),
  prenom: schema.string(),
  date_naiss: schema.string(),
  lieu_naiss: schema.string(),
  pays: schema.string(),
  ville: schema.string(),
  addresse: schema.string(),
  telephone: schema.string(),
  pieceID: schema.string(),
  profession: schema.string(),
  revenue: schema.string(),
  type_compte: schema.string(),
  pin: schema.string(),
  solde_compte: schema.number(),
  solde_carte: schema.number(),
  accountnumber: schema.number(),
  cvv: schema.number(),
  cartenumber: schema.number(),
});

export default userSchema;
