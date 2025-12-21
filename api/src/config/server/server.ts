import express from 'express';
import * as Middleware from '../middleware/middleware';
import * as Routes from '../../routes';

/**
 * @constant {express.Application}
 */
const app: express.Application = express();

/**
 * @constructs express.Application Middleware
 */
Middleware.configure(app);

/**
 * @constructs express.Application Routes
 */
Routes.init(app);

/**
 * @constructs express.Application Error Handler
 */
Middleware.initErrorHandler(app);

/**
 * sets port 3000 to default or unless otherwise specified in the environment
 */
app.set('port', process.env.PORT || 4000);

/**
 * sets secret to 'superSecret', otherwise specified in the environment
 */
app.set('secret', process.env.SECRET || 'superSecret');

/**
 * @exports {express.Application}
 */

// Middleware de 404: debe ir después del error handler global
app.use((req, res) => {
	res.status(404).json({
		status: 404,
		message: 'Not Found'
	});
});

export default app;
