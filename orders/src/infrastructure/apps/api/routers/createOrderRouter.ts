import { handleValidations, requireAuth } from "@tickets-kyrito/common";
import express from "express";
import { createOrderController } from '../controllers/createOrderController';
import { createOrderRules } from "../rules/createOrderRules";


const router = express.Router();


router.post('/api/orders',
    requireAuth,
    createOrderRules,
    handleValidations,
    createOrderController
);


export { router as createOrderRouter };