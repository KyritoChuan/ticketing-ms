import { Request, Response } from "express";


export default function currentUserController(req: Request, res: Response) {
    res.send({ currentUser: req.currentUser || null });
}