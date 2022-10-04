import { requireAuth } from "@tickets-kyrito/common";
import express from "express";
import { showOrderController } from '../controllers/showOrderController';


const router = express.Router();


router.get('/api/orders/:orderId',
    requireAuth,
    showOrderController
);


export { router as showOrderRouter };