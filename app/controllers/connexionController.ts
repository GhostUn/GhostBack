import User from '#models/user'
import { LoginValidator } from '#validators/Auth/login'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
// Importation du contrat HTTP
//import type { HttpContextContract } from '@ioc:core/HttpContext';





export default class ConnexionController {

    public async connexion({ request, response }: HttpContext) {
        try {
          // Validation des données

          const { email, password } = await request.validateUsing(LoginValidator)

        
          const user = await User.verifyCredentials(email,password)
      

          console.log('user', await User.verifyCredentials(email,password))
      
          // Tentative d'authentification
          const accessToken= await User.accessTokens.create(user, ['*'], {
            expiresIn:'48h',})
            console.log('email', accessToken)


          console.log('user', user)
          return response.status(200).json({
            message: 'Utilisateur connectè avec succès',
            user: user,
            accessToken
          })
        } catch (error) {
          // Gestion des erreurs
          console.log('error.code', error.code)
          if (error.code === 'E_INVALID_JWT_TOKEN') {
            return response.badRequest('Invalid credentials');
          }
          return response.internalServerError({ message: 'Erreur serveur', error: error.message });
        }
      }
}
