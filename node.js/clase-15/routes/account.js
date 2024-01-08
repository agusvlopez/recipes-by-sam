import express from 'express';
import accountController from '../controllers/account.js';
import { validateAccount } from '../middleware/account.js';

const route = express.Router();

//registro
route.post('/account', [validateAccount],accountController.createAccount);

//login
route.post('/session', [validateAccount], accountController.login);

export default route;