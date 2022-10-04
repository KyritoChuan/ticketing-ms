import { TicketEntity } from '../entities/ticketEntity';
import { Nullable } from '../entities/nullable';

export interface TicketRepository {
    addTicket: (newTicket: TicketEntity) => Promise<TicketEntity>;
    updateTicket: (id: string, dataTicket: TicketEntity) => Promise<Nullable<TicketEntity>>;
    findTicketById: (id: string) => Promise<Nullable<TicketEntity>>;
    findUsers: () => Promise<TicketEntity[]>;
}