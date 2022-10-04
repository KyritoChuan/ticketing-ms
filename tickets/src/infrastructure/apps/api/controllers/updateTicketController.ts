import { Response, Request } from "express";
import { Ticket } from "../../../persistence/mongoDB/schemas/ticket";
import { TicketUpdatedPublisher } from '../events/publishers/ticketUpdatedPublisher';
import { natsWrapper } from "../utils/natsWrapper";
import { MongoTicketRepository } from "../../../persistence/mongoDB/mongoTicketRepository";
import { UpdaterTicketUseCase } from '../../../../application/updaterTicketUseCase';


export async function updateTicketController(req: Request, res: Response) {
    const { id } = req.params;
    const { title, price } = req.body;

    const ticket = Ticket.build({
        title,
        price,
        userId: req.currentUser!.id
    });

    const ticketRepository = new MongoTicketRepository();
    const updaterTicketUseCase = new UpdaterTicketUseCase(ticketRepository);

    const ticketResponse = await updaterTicketUseCase.run(
        id,
        req.currentUser!.id,
        ticket
    );

    //No se espera la promise, no se necesita la respuesta, solo se envía.
    new TicketUpdatedPublisher(natsWrapper.client).publish({
        id: ticketResponse.id,
        title: ticketResponse.title,
        price: ticketResponse.price,
        userId: ticketResponse.userId,
        version: ticketResponse.version,
    });

    res.status(200).send(ticketResponse);
}



    // ticket.set({
    //     title,
    //     price,
    // });
