import { OrderRepository } from "../domain/repositories/orderRepository";
import { OrderEntity } from '../domain/entities/orderEntity';
import { NotAuthorizatedError, NotFoundError } from "@tickets-kyrito/common";




export class FinderOrderUseCase {
    private readonly _orderRepository: OrderRepository;

    constructor(orderRepository: OrderRepository) {
        this._orderRepository = orderRepository;
    }

    async run(id: string, currentUserId: string): Promise<OrderEntity> {
        const order = await this._orderRepository.findOrderAndTicketById(id);

        if (!order)
            throw new NotFoundError();

        if (order.userId !== currentUserId)
            throw new NotAuthorizatedError();

        return order;
    }
}