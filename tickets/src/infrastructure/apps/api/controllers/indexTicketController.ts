import { Request, Response } from "express";
import { FinderAllTicketsUseCase } from "../../../../application/finderAllTicketsUseCase";
import { MongoTicketRepository } from "../../../persistence/mongoDB/mongoTicketRepository";



export async function indexTicketController(_req: Request, res: Response) {
    const ticketRepository = new MongoTicketRepository();
    const finderAllTicketsUseCase = new FinderAllTicketsUseCase(ticketRepository);

    const ticketResponse = await finderAllTicketsUseCase.run();

    res.status(200).send(ticketResponse);
}