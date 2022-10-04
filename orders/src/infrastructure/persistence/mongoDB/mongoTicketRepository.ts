import { BadRequestError } from '@tickets-kyrito/common';
import { Nullable } from '../../../domain/entities/nullable';
import { TicketEntity } from '../../../domain/entities/ticketEntity';
import { TicketRepository } from '../../../domain/repositories/ticketRepository';
import { Ticket } from './schemas/ticket';





export class MongoTicketRepository implements TicketRepository {
    async findTicketById(id: string): Promise<Nullable<TicketEntity>> {
        try {
            const ticket = await Ticket.findById(id);
            return ticket;
        }
        catch (error) {
            console.log("Error in server {3}: findTicketById: " + error);
            throw new BadRequestError("Error in find ticket by id.");
        }
    }


}