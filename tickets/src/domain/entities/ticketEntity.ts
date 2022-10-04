export interface TicketEntity {
    id?: any;
    title: string;
    price: number;
    userId: string;

    version: number;
    orderId?: string;
}