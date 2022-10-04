import { OrderEntity } from '../entities/orderEntity';
import { Nullable } from '../entities/nullable';

export interface OrderRepository {
    addOrder: (newOrder: OrderEntity) => Promise<OrderEntity>;
    findOrderAndTicketById: (orderId: string) => Promise<Nullable<OrderEntity>>;
    findOrdersAndTickets: (currentUserId: string) => Promise<OrderEntity[]>;
}