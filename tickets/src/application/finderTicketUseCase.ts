import { TicketEntity } from '../domain/entities/ticketEntity';
import { TicketRepository } from '../domain/repositories/ticketRepository';
import { NotFoundTicketError } from '../domain/exceptions/notFoundTicketError';



export class FinderTicketUseCase {
    private readonly _ticketRepository: TicketRepository;

    constructor(ticketRepository: TicketRepository) {
        this._ticketRepository = ticketRepository;
    }

    async run(id: string): Promise<TicketEntity> {
        const ticket = await this._ticketRepository.findTicketById(id);

        if (!ticket) {
            throw new NotFoundTicketError();
        }

        return ticket;
    }
}