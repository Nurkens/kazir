import Router from 'express';
const router = new Router();
import controller from './authController.js';
import {check} from 'express-validator';


router.post('/registration', [
    check('username','Username can not be empty').notEmpty(),
    check('password','Password should be more than 4 and less than 10 characters').isLength({min:4,max:10})
],controller.registration);
router.post('/login',controller.login);
router.get('/users',controller.getUsers);

export default router;