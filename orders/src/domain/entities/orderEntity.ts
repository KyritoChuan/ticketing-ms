import { OrderStatus } from "@tickets-kyrito/common";
import { TicketEntity } from './ticketEntity';

export interface OrderEntity {
    id?: any;
    userId: string;
    status: OrderStatus;
    expiresAt: Date;
    ticket: TicketEntity;

    version?: number;
}