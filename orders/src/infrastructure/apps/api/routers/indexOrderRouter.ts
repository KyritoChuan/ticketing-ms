import { requireAuth } from "@tickets-kyrito/common";
import express from "express";
import { indexOrderController } from '../controllers/indexOrderController';


const router = express.Router();


router.get('/api/orders',
    requireAuth,
    indexOrderController
);


export { router as indexOrderRouter };