import express from 'express';
import { updateTicketController } from '../controllers/updateTicketController';
import { handleValidations, requireAuth } from '@tickets-kyrito/common';
import { updateTicketRules } from '../rules/updateTicketRules';
// import { createTicketRules } from '../rules/createTicketRules';

const router = express.Router();

router.put("/api/tickets/:id",
    requireAuth,
    updateTicketRules,
    handleValidations,
    updateTicketController);

export { router as updateTicketRouter };