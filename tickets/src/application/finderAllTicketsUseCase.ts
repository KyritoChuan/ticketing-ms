import { TicketEntity } from '../domain/entities/ticketEntity';
import { TicketRepository } from '../domain/repositories/ticketRepository';



export class FinderAllTicketsUseCase {
    private readonly _ticketRepository: TicketRepository;

    constructor(ticketRepository: TicketRepository) {
        this._ticketRepository = ticketRepository;
    }

    async run(): Promise<TicketEntity[]> {
        const ticket = await this._ticketRepository.findUsers();
        return ticket;
    }
}