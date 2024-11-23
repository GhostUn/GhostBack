import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
// Importation du contrat HTTP
//import type { HttpContextContract } from '@ioc:core/HttpContext';
import UserValidator from 'app/validators/Auth/store_user.js'








export default class AuthController {

  const generateCreditCardCode = (taille : int): bigint => {
    let code = '';
    for (let i = 0; i < taille; i++) {
      const randomDigit = Math.floor(Math.random() * 10);
      code += randomDigit.toString();
    }
    return BigInt(code);
  };


public async create({ request, response }: HttpContext) {
  // Récupération des données utilisateur
  const userData = request.only([
    'email', 'password', 'nom', 'prenom', 'date_naiss', 'lieu_naiss',
    'pays', 'ville', 'Addresse', 'telephone', 'piece_id', 
    'profession', 'revenue', 'type_compte', 'pin',
    "solde_compte",
        "solde_carte",
        "accountnumber",
        "cvv",
        "cartenumber"
  ])
      userData.solde_compte = generateCreditCardCode(5);
      userData.solde_carte = generateCreditCardCode(5);
      userData.accountnumber = generateCreditCardCode(12);//generer un pass de 12 caracteres 
      userData.cartenumber= generateCreditCardCode(16);//generer un pass de 12 caracteresC
      userData.cvv = generateCreditCardCode(3);//generer un pass de 12 caracteres 
      



  try {
    // Exécuter manuellement la validation en instanciant le validateur
 
    // Créer un nouvel utilisateur en base de données
    const user = await User.create(userData)
  console.log('userData789', userData)
    return response.status(201).json({
      message: 'Utilisateur créé avec succès',
      user: user,
    })
  } catch (error) {
    return response.status(400).json({
      message: 'Erreur lors de la création de l\'utilisateur',
      error: error.message,
    })
  }
}

  //
    public async store({ request, response }: HttpContext) {
        const userData = request.only(["email",
          "password",
          "nom",
          "prenom",
          "date_naiss",
          "lieu_naiss",
          "pays",
          "ville",
          "Addresse",
          "telephone",
          "pieceID",
          "profession",
          "revenue",
          "type_compte",
          "pin",
        
      ])
    
        // Logique pour créer un utilisateur (exemple simple)
        // Vous ajouterez ici votre logique d'enregistrement dans la base de données
    
        return response.status(201).send({
          message: 'User created successfully',
          data: userData,
        })
      }
 
      //

      public async getUser({ auth, response }: HttpContext) {
        
        console.log('first 58', auth)
        try {
         
      
          // Vérifier si l'utilisateur est authentifié
          if (!(await auth.check())) {
            return response.status(401).json({
              msg: 'need to be authenticated',
            });
          }
          console.log('response123', auth.user?.$attributes)
    
          // Renvoyer les informations de l'utilisateur authentifié
          //const user = await User.findOrFail(); // Recherche l'utilisateur par ID
          
          return response.status(200).json({
            user: auth.user?.$attributes,
          });
        } catch (error) {
          // Gestion des erreurs serveur
          console.error('Erreur lors de la récupération de l\'utilisateur:', error);
          return response.status(500).json({
            msg: 'Erreur serveur',
            error: error.message,
          });
        }
      
        }
      
        public async getUserAdmin({ response }: HttpContext) {
          try {
            const users = await User.query().orderBy('id', 'asc') // Trie les utilisateurs par ID de manière croissante // Récupère tous les utilisateurs depuis la BD
            return response.status(200).json(users) // Retourne les utilisateurs sous forme de JSON
          } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs getUserAdmin:', error)
            return response.status(500).json({
              message: 'Erreur lors de la récupération des utilisateurs GUA',
            })
          }
        }


        public async getUserAdminUnique({ params, response }: HttpContext) {
          try {
            const user = await User.findOrFail(params.id); // Recherche l'utilisateur par ID
            
            console.log('params.id', user?.$attributes)
           // return response.status(200).json(user);
            return response.status(200).json({
              user: user?.$attributes,
            });
          } catch (error) {
            return response.status(404).json({ message: 'Utilisateur non trouvé ' });
          }
        }


        // Méthode pour mettre à jour un utilisateur
  public async updateUser({ request, response, params }: HttpContext) {
    console.log('userId15899s', params.id)
    try {
      // Récupérer l'ID de l'utilisateur depuis les paramètres de la requête
      const userId = params.id;
      // Récupérer et valider les données de mise à jour
      const payload = request.only([
       
        "nom",
        "lieu_naiss",
        "ville",
        "addresse",
        "profession",
        
        "prenom",
        "date_naiss",
        "email",
        "revenue",
        "password",
        "pays",
        "telephone",
        "solde_compte",
        "solde_carte",
        "accountnumber",
        "cvv",
        "cartenumber"
       
      ]); // Adapter les champs selon votre modèle

      // Récupérer l'utilisateur par son ID
      const user = await User.find(userId);
      if (!user) {
        return response.status(404).json({
          message: 'Utilisateur non trouvé',
        });
      }

      // Mettre à jour les champs de l'utilisateur
      user.merge(payload);
      await user.save();

      // Réponse en cas de succès
      return response.status(200).json({
        message: 'Utilisateur mis à jour avec succès',
        user,
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l’utilisateur:', error);

      // Réponse en cas d'erreur
      return response.status(500).json({
        message: 'Erreur lors de la mise à jour de l’utilisateur', error
      });
    }
  }
        
      
}

