import { handleValidations, requireAuth } from '@tickets-kyrito/common';
import express from 'express';
import { createPaymentController } from '../controllers/createPaymentController';
import { createPaymentRules } from '../rules/createPaymentRules';


const router = express.Router();

router.post('/api/payments',
    requireAuth,
    createPaymentRules,
    handleValidations,
    createPaymentController
);

export { router as createPaymentRouter };