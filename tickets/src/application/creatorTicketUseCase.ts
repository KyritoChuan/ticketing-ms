import { TicketEntity } from '../domain/entities/ticketEntity';
import { TicketRepository } from '../domain/repositories/ticketRepository';
import { NotCreatedUserError } from '../domain/exceptions/notCreatedTicketError';



export class CreatorTicketUseCase {
    private readonly _ticketRepository: TicketRepository;

    constructor(ticketRepository: TicketRepository) {
        this._ticketRepository = ticketRepository;
    }

    async run(ticket: TicketEntity): Promise<TicketEntity> {
        const ticketResponse = await this._ticketRepository.addTicket(ticket);

        if (!ticketResponse) {
            throw new NotCreatedUserError();
        }

        return ticketResponse;
    }
}