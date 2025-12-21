import { Router } from 'express';
import { UserComponent } from '../components';
import catchAsync from '../utils/catchAsync';

/**
 * @constant {express.Router}
 */
const router: Router = Router();


router.get('/', catchAsync(UserComponent.findAll));
router.post('/', catchAsync(UserComponent.create));
router.get('/:id', catchAsync(UserComponent.findOne));
router.delete('/:id', catchAsync(UserComponent.remove));

/**
 * @export {express.Router}
 */
export default router;
