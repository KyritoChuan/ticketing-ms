import { TicketEntity } from '../entities/ticketEntity';
import { Nullable } from '../entities/nullable';

export interface TicketRepository {
    findTicketById: (id: string) => Promise<Nullable<TicketEntity>>;
    // addTicket: (newTicket: TicketEntity) => Promise<Nullable<TicketEntity>>;
    // updateTicket: (id: string, dataTicket: TicketEntity) => Promise<Nullable<TicketEntity>>;
    // findUsers: () => Promise<TicketEntity[]>;
}