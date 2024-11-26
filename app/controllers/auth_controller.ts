import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import {
  UserValidator
} from '#validators/store_user'

export default class AuthController {
  private generateCreditCardCode(taille: number): bigint {
    let code = '';
    for (let i = 0; i < taille; i++) {
      const randomDigit = Math.floor(Math.random() * 10);
      code += randomDigit.toString();
    }
    return BigInt(code);
  }

  public async create({ request, response }: HttpContext) {
    const userData = request.only([
      'email', 'password', 'nom', 'prenom', 'date_naiss', 'lieu_naiss',
      'pays', 'ville', 'addresse', 'telephone', 'pieceID',
      'profession', 'revenue', 'type_compte', 'pin',
      'solde_compte', 'solde_carte', 'accountnumber', 'cvv', 'cartenumber',
    ]);

    userData.solde_compte = this.generateCreditCardCode(5);
    userData.solde_carte = this.generateCreditCardCode(5);
    userData.accountnumber = this.generateCreditCardCode(12);
    userData.cartenumber = this.generateCreditCardCode(16);
    userData.cvv = this.generateCreditCardCode(3);

    try {
      const payload = await createPostValidator.validate(userData)//''
      const user = await User.create(payload);//55
      return response.status(201).json({
        message: 'Utilisateur créé avec succès',
        user,
      });
    } catch (error) {
      return response.status(400).json({
        message: 'Erreur lors de la création de l\'utilisateur',
        error: error.message,
      });
    }
  }

  public async store({ request, response }: HttpContext) {
    const userData = request.only([
      'email', 'password', 'nom', 'prenom', 'date_naiss', 'lieu_naiss',
      'pays', 'ville', 'addresse', 'telephone', 'pieceID',
      'profession', 'revenue', 'type_compte', 'pin',
    ]);

    return response.status(201).send({
      message: 'User created successfully',
      data: userData,
    });
  }

  public async getUser({ auth, response }: HttpContext) {
    try {
      if (!(await auth.check())) {
        return response.status(401).json({ msg: 'Need to be authenticated' });
      }
      return response.status(200).json({ user: auth.user });
    } catch (error) {
      return response.status(500).json({
        msg: 'Erreur serveur',
        error: error.message,
      });
    }
  }

  public async getUserAdmin({ response }: HttpContext) {
    try {
      const users = await User.query().orderBy('id', 'asc');
      return response.status(200).json(users);
    } catch (error) {
      return response.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
    }
  }

  public async updateUser({ request, response, params }: HttpContext) {
    try {
      const userId = params.id;
      const payload = request.only([
        'nom', 'lieu_naiss', 'ville', 'addresse', 'profession',
        'prenom', 'date_naiss', 'email', 'revenue', 'password',
        'pays', 'telephone', 'solde_compte', 'solde_carte',
        'accountnumber', 'cvv', 'cartenumber',
      ]);

      const user = await User.find(userId);
      if (!user) {
        return response.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      user.merge(payload);
      await user.save();
      return response.status(200).json({
        message: 'Utilisateur mis à jour avec succès',
        user,
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Erreur lors de la mise à jour de l’utilisateur',
        error,
      });
    }
  }
}
