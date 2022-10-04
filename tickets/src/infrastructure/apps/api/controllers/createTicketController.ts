import { Request, Response } from "express";
import { CreatorTicketUseCase } from "../../../../application/creatorTicketUseCase";
import { MongoTicketRepository } from "../../../persistence/mongoDB/mongoTicketRepository";
import { Ticket } from "../../../persistence/mongoDB/schemas/ticket";
import { TicketCreatedPublisher } from '../events/publishers/ticketCreatedPublisher';
import { natsWrapper } from "../utils/natsWrapper";


export async function createTicketController(req: Request, res: Response) {
    const { title, price } = req.body;

    const newTicket = Ticket.build({
        title,
        price,
        userId: req.currentUser!.id
    });

    const ticketRepository = new MongoTicketRepository();
    const creatorTicketUseCase = new CreatorTicketUseCase(ticketRepository);

    const ticketResponse = await creatorTicketUseCase.run(newTicket);

    new TicketCreatedPublisher(natsWrapper.client).publish({
        id: ticketResponse.id,
        title: ticketResponse.title,
        price: ticketResponse.price,
        userId: ticketResponse.userId,
        version: ticketResponse.version,
    });

    res.status(201).send(ticketResponse);
}