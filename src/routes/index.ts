import { Router } from 'express';
const routes = Router();

/* CONTROLLERS APLICATION */
import { TrendingController } from '../controllers/TrendingController';
import { UsuarioController } from '../controllers/UsuarioController';
import { RuningControllers } from '../controllers/RuningControllers';
import { ProfileController } from '../controllers/ProfileController';
import { AuthController } from '../controllers/AuthController';
import { required, optional } from '../middlewares/login';

/* ROTAS PUBLICAS */
routes.post('/api/auth', new AuthController().login)
routes.get('/', new RuningControllers().status)

routes.get('/api/usuarios/search', new UsuarioController().findByUsername)
routes.get('/api/usuarios/uuid', new UsuarioController().findByUuid)
routes.get('/api/usuarios', new UsuarioController().findall)

/* ROTAS PRIVADAS */
routes.delete('/api/usuarios', required, new UsuarioController().delete)
routes.post('/api/usuarios',  new UsuarioController().create)
routes.put('/api/usuarios', required, new UsuarioController().update)

routes.post('/api/trending', new TrendingController().create)
routes.get('/api/trending', new TrendingController().findall)

routes.post('/api/profile',  new ProfileController().create)

export default routes