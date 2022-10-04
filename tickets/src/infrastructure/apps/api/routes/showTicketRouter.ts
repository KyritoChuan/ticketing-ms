import express from "express";
import { showTicketController } from "../controllers/showTicketController";


const router = express.Router();


router.get('/api/tickets/:id',
    showTicketController
);


export { router as showTicketRouter };