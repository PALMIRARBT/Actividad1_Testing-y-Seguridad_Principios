/* eslint-disable import/no-extraneous-dependencies */
import * as express from 'express';
import * as jwtConfig from '../config/middleware/jwtAuth';
import * as swaggerUi from 'swagger-ui-express';
import AuthRouter from './AuthRouter';
import UserRouter from './UserRouter';
import AboutMeRouter from './AboutMeRouter';
import ProjectsRouter from './ProjectsRouter';


// eslint-disable-next-line @typescript-eslint/ban-types
let swaggerDoc: Object;

try {
  swaggerDoc = require('../../swagger.json');
} catch (error) {
  console.log('***************************************************');
  console.log('  Seems like you doesn`t have swagger.json file');
  console.log('  Please, run: ');
  console.log('  $ swagger-jsdoc -d swaggerDef.js -o swagger.json');
  console.log('***************************************************');
}

/**
 * @export
 * @param {express.Application} app
 */
export function init(app: express.Application): void {
  const router: express.Router = express.Router();

  // Ruta pública para crear usuario (registro)
  const { create } = require('../components/User');
  app.post('/v1/users', create);

  // Rutas protegidas para usuarios (requieren JWT)
  app.use('/v1/users', jwtConfig.isAuthenticated, UserRouter);

  /**
   * @description
   *  Forwards any requests to the /v1/aboutMe URI to our AboutMeRouter
   *  Also, check if user authenticated
   * @constructs
   */
  app.use('/v1/aboutMe', AboutMeRouter);

  /**
   * @description
   *  Forwards any requests to the /v1/projects URI to our ProjectsRouter
   *  Also, check if user authenticated
   * @constructs
   */
  app.use('/v1/projects', ProjectsRouter);

  /**
   * @description Forwards any requests to the /auth URI to our AuthRouter
   * @constructs
   */
  app.use('/auth', AuthRouter);

  /**
   * @description
   *  If swagger.json file exists in root folder, shows swagger api description
   *  else send commands, how to get swagger.json file
   * @constructs
   */
  if (swaggerDoc) {
    app.use('/docs', swaggerUi.serve);
    app.get('/docs', swaggerUi.setup(swaggerDoc));
  }


  /**
   * @constructs all routes
   */
  app.use(router);
}
