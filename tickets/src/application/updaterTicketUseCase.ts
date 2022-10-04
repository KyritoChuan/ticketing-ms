import { TicketEntity } from '../domain/entities/ticketEntity';
import { TicketRepository } from '../domain/repositories/ticketRepository';
import { NotAuthorizatedError, BadRequestError } from '@tickets-kyrito/common';
import { NotUpdatedUserError } from '../domain/exceptions/notUpdatedTicketError';
import { NotFoundTicketError } from '../domain/exceptions/notFoundTicketError';



export class UpdaterTicketUseCase {
    private readonly _ticketRepository: TicketRepository;

    constructor(ticketRepository: TicketRepository) {
        this._ticketRepository = ticketRepository;
    }

    async run(id: string, currentUserId: string, dataTicket: TicketEntity): Promise<TicketEntity> {
        const ticket = await this._ticketRepository.findTicketById(id);

        if (!ticket) {
            throw new NotFoundTicketError();
        }

        if (ticket.orderId) {
            throw new BadRequestError("Cannot edit a reserved ticket");
        }

        if (ticket.userId !== currentUserId) {
            throw new NotAuthorizatedError();
        }

        ticket.title = dataTicket.title;
        ticket.price = dataTicket.price;

        const updatedTicket = await this._ticketRepository.updateTicket(id, ticket);

        if (!updatedTicket) //Manejar de otra manera el error, con los customError heredados.
            throw new NotUpdatedUserError();

        return updatedTicket;
    }
}