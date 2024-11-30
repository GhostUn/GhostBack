import vine from '@vinejs/vine';
import Database from '@ioc:Adonis/Lucid/Database'; // Si vous utilisez Lucid comme ORM

const UserValidator = vine.compile({
  email: vine
    .string()
    .email()
    .use(async (value, { errorReporter }) => {
      // Vérifie si l'email existe déjà dans la table
      const exists = await Database.query()
        .from('users')
        .where('email', value)
        .first();

      if (exists) {
        errorReporter.report(
          'unique', // Type d'erreur
          'Email already exists', // Message d'erreur
          'email' // Champ concerné
        );
      }
    }),
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
});

export default UserValidator;
