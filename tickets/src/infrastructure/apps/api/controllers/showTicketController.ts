import { Request, Response } from "express";
import { MongoTicketRepository } from '../../../persistence/mongoDB/mongoTicketRepository';
import { FinderTicketUseCase } from '../../../../application/finderTicketUseCase';




export async function showTicketController(req: Request, res: Response) {
    const { id } = req.params;

    const ticketRepository = new MongoTicketRepository();
    const finderTicketUseCase = new FinderTicketUseCase(ticketRepository);

    const ticketResponse = await finderTicketUseCase.run(id);

    res.status(200).send(ticketResponse);
}