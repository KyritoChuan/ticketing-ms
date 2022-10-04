import express from "express";
import { indexTicketController } from "../controllers/indexTicketController";


const router = express.Router();


router.get('/api/tickets',
    indexTicketController
);


export { router as indexTicketRouter };