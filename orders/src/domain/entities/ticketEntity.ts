export interface TicketEntity {
    id?: any;
    title: string;
    price: number;

    version: number;
    isReserved(): Promise<boolean>;
}