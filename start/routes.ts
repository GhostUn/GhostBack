/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/auth_controller'
import ConnexionController from '#controllers/connexionController'


router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/users/k', async () => {
  return {
    hello: 'world',
  }
})


router.post('/users/create', [AuthController, 'create']) // Appel de la méthode 'store'
router.post('/users/connexion', [ConnexionController, 'connexion']) // Appel de la méthode 'store'
router.get('/users/getUser', [AuthController, 'getUser']) // Appel de la méthode 'store'
router.get('/Admin/getUser', [AuthController, 'getUserAdmin']) // Appel de la méthode 'store'
router.get('Admin/getUserID/:id', [AuthController, 'getUserAdminUnique']);
router.patch('/Admin/updateUser/:id', [AuthController, 'updateUser']);




router.post('users/login', 'AuthController.login')
