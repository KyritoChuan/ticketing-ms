import { BadRequestError } from '@tickets-kyrito/common';
import { Nullable } from '../../../domain/entities/nullable';
import { OrderEntity } from '../../../domain/entities/orderEntity';
import { OrderRepository } from '../../../domain/repositories/orderRepository';
import { Order } from './schemas/order';



export class MongoOrderRepository implements OrderRepository {
    async addOrder(newOrder: OrderEntity): Promise<OrderEntity> {
        const orderDB = new Order(newOrder);

        try {
            const saveResponse = await orderDB.save();
            return saveResponse;

        } catch (error) {
            console.log("Error in server {1}: AddOrder: " + error);
            throw new BadRequestError("Error in create the order.");
        }
    }

    async findOrderAndTicketById(orderId: string): Promise<Nullable<OrderEntity>> {
        try {
            const order = await Order.findById(orderId)
                .populate('ticket');

            return order;
        }
        catch (error) {
            console.log("Error in server {2}: FindOrderAndTicketById: " + error);
            throw new BadRequestError("Error in find order by id.");
        }
    }

    async findOrdersAndTickets(currentUserId: string): Promise<OrderEntity[]> {
        try {
            const orders = await Order.find({
                userId: currentUserId,
            }).populate('ticket');
            //Populate añade el ticket correspondiente a su Order.
            return orders;
        }
        catch (error) {
            console.log("Error in server {3}: FindOrdersAndTickets: " + error);
            throw new BadRequestError("Error in find orders of the current user.");
        }
    }
}