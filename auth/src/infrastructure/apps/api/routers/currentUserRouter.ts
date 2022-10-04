import express from 'express';
import currentUserController from '../controllers/currentUserController';
import { currentUser } from '@tickets-kyrito/common';

const router = express.Router();

router.get("/api/users/current-user",
    currentUser,
    currentUserController
);

export { router as currentUserRouter };
