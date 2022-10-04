import { requireAuth, handleValidations } from '@tickets-kyrito/common';
import express from 'express';
import { createTicketController } from '../controllers/createTicketController';
import { createTicketRules } from '../rules/createTicketRules';

const router = express.Router();

router.post("/api/tickets",
    requireAuth,
    createTicketRules,
    handleValidations,
    createTicketController);

export { router as createTicketRouter };