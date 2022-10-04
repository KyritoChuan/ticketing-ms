import { BadRequestError } from '@tickets-kyrito/common';
// import mongoose from 'mongoose';
import { Nullable } from '../../../domain/entities/nullable';
import { TicketEntity } from '../../../domain/entities/ticketEntity';
import { TicketRepository } from '../../../domain/repositories/ticketRepository';
import { Ticket } from './schemas/ticket';


// const con = mongoose.connection;

export class MongoTicketRepository implements TicketRepository {
    async addTicket(newTicket: TicketEntity): Promise<TicketEntity> {
        // let ticket: TicketDocument | null = null;
        // const ticketDB = new Ticket(newTicket);
        // const session = await con.startSession();

        // try {
        //     session.startTransaction();
        //     ticket = await ticketDB.save({ session });
        //     await session.commitTransaction();
        //     console.log('success');

        // } catch (error) {
        //     console.log("Error in server {1}: AddTicket: " + error);
        //     await session.abortTransaction();
        //     ticket = null;
        //     //throw new BadRequestError("User already exists.");
        // }
        // finally {
        //     session.endSession();
        //     return ticket;
        // }

        const ticketDB = new Ticket(newTicket);

        try {
            const saveResponse = await ticketDB.save();
            return saveResponse;

        } catch (error) {
            console.log("Error in server {1}: AddTicket: " + error);
            throw new BadRequestError("User already exists.");
        }
    }

    async updateTicket(id: string, dataTicket: TicketEntity): Promise<Nullable<TicketEntity>> {
        try {
            const ticket = await Ticket.findById(id);

            if (!ticket) {
                return null;
            } else {
                ticket.set({
                    title: dataTicket.title,
                    price: dataTicket.price,
                });
                const updatedTicket = await ticket.save();
                return updatedTicket;
            }
        } catch (error) {
            console.log("Error in server {2}: updateTicket: " + error);
            throw new BadRequestError("Error in update ticket.");
        }
    }

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

    async findUsers(): Promise<TicketEntity[]> {
        try {
            const tickets = await Ticket.find({});
            return tickets;
        } catch (error) {
            console.log("Error in server {4}: findUsers: " + error);
            throw new BadRequestError("Error in find Users.");
        }
    }
}