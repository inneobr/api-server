import { Router } from 'express';
const routes = Router();

/* CONTROLLERS APLICATION */
import { TrendingController } from '../controllers/TrendingController';
import { UsuarioController } from '../controllers/UsuarioController';
import { RuningControllers } from '../controllers/RuningControllers';
import { VideoController } from '../controllers/VideoController';
import { AuthController } from '../controllers/AuthController';
import { required, optional } from '../middlewares/login';

/* ROTAS PUBLICAS */
routes.get('/api/videos/search', new VideoController().findByTitle)
routes.get('/api/videos/uuid', new VideoController().findByUuid)
routes.get('/api/videos', new VideoController().findall)
routes.post('/api/auth', new AuthController().login)
routes.get('/', new RuningControllers().status)

routes.get('/api/usuarios/search', new UsuarioController().findByUsername)
routes.get('/api/usuarios/videos', new UsuarioController().findVideos)
routes.get('/api/usuarios/uuid', new UsuarioController().findByUuid)
routes.get('/api/usuarios', new UsuarioController().findall)

/* ROTAS PRIVADAS */
routes.delete('/api/usuarios', required, new UsuarioController().delete)
routes.post('/api/usuarios',  new UsuarioController().create)
routes.put('/api/usuarios', required, new UsuarioController().update)

routes.delete('/api/videos', required, new VideoController().delete)
routes.post('/api/videos', required, new VideoController().create)
routes.put('/api/videos', required, new VideoController().update)

routes.post('/api/thoughts', new TrendingController().create)
routes.get('/api/thoughts', new TrendingController().findall)

export default routes