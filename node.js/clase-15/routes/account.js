import express from 'express';
import accountController from '../controllers/account.js';
import { validateAccount, verifySession } from '../middleware/account.js';

const route = express.Router();

//registro
route.post('/account', [validateAccount], accountController.createAccount);

//login
route.post('/session', [validateAccount], accountController.login);

//logout
route.delete('/session', [verifySession], accountController.logout)
export default route;