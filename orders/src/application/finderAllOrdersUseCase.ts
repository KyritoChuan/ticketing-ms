import { OrderRepository } from "../domain/repositories/orderRepository";
import { OrderEntity } from '../domain/entities/orderEntity';




export class FinderAllOrdersUseCase {
    private readonly _orderRepository: OrderRepository;

    constructor(orderRepository: OrderRepository) {
        this._orderRepository = orderRepository;
    }

    async run(currentUserId: string): Promise<OrderEntity[]> {
        const orders = await this._orderRepository.findOrdersAndTickets(currentUserId);
        return orders;
    }
}