import express from "express";
import { requireAuth } from "@tickets-kyrito/common";
import { deleteOrderController } from '../controllers/deleteOrderController';


const router = express.Router();


router.delete('/api/orders/:orderId',
    requireAuth,
    deleteOrderController
);


export { router as deleteOrderRouter };