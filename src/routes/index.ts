import { Router } from 'express';
const routes = Router();

import { TrendingController } from '../controllers/TrendingController';
import { RuningControllers } from '../controllers/RuningControllers';
import { UsuarioController } from '../controllers/UsuarioController';
import { ProfileController } from '../controllers/ProfileController';
import { ImagemController } from '../controllers/ImagemController';
import { AuthController } from '../controllers/AuthController';
import { required } from '../middlewares/login';


routes.post('/api/auth', new AuthController().login);
routes.get('/', new RuningControllers().status);

routes.get('/api/usuarios/search', new UsuarioController().findByUsername);
routes.delete('/api/usuarios',required, new UsuarioController().delete);
routes.put('/api/usuarios',required, new UsuarioController().update);
routes.get('/api/usuarios', new UsuarioController().findById);
routes.post('/api/usuarios', new UsuarioController().create);
routes.get('/api/usuarios', new UsuarioController().findall);

routes.post('/api/profile', required, new ProfileController().create);
routes.put('/api/profile',required,  new ProfileController().update);
routes.get('/api/profile/all',  new ProfileController().findall)
routes.get('/api/profile',  new ProfileController().find);

routes.delete('/api/trending', required,  new TrendingController().delete);
routes.post('/api/trending', required, new TrendingController().create);
routes.get('/api/trending',  new TrendingController().find);

routes.post('/api/imagem', required, new ImagemController().create);
routes.get('/api/imagem', required, new ImagemController().findById);

export default routes