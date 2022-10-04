import { OrderRepository } from '../domain/repositories/orderRepository';
import { NotAuthorizatedError, NotFoundError, OrderStatus } from '@tickets-kyrito/common';
import { OrderEntity } from '../domain/entities/orderEntity';




export class CancelOrderUseCase {
    private readonly _orderRepository: OrderRepository;

    constructor(orderRepository: OrderRepository) {
        this._orderRepository = orderRepository;
    }


    async run(orderId: string, currentUserId: string): Promise<OrderEntity> {
        const order = await this._orderRepository.findOrderAndTicketById(orderId);

        if (!order)
            throw new NotFoundError();

        if (order.userId !== currentUserId)
            throw new NotAuthorizatedError();

        order.status = OrderStatus.Cancelled;

        const orderResponse = await this._orderRepository.addOrder(order);
        return orderResponse;
    }
}