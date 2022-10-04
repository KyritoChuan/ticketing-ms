import express from 'express';
import { registerUserRules } from '../rules/registerUserRules';
import { handleValidations } from '@tickets-kyrito/common';
import { registerController } from '../controllers/registerController';

const router = express.Router();

router.post("/api/users/register",
    registerUserRules,
    handleValidations,
    registerController
);

export { router as registerRouter };
