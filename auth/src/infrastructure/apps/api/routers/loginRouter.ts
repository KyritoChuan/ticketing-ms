import express from 'express';
import { loginRules } from '../rules/loginRules';
import { handleValidations } from '@tickets-kyrito/common';
import { loginController } from '../controllers/loginController';

const router = express.Router();

router.post("/api/users/login",
    loginRules,
    handleValidations,
    loginController
);



export { router as loginRouter };