import { Request, Response } from "express";
import { FinderOrderUseCase } from '../../../../application/finderOrderUseCase';
import { MongoOrderRepository } from '../../../persistence/mongoDB/mongoOrderRepository';



export async function showOrderController(req: Request, res: Response) {
    const { orderId } = req.params;
    const currentUserId = req.currentUser!.id;

    const orderRepository = new MongoOrderRepository();
    const finderOrderUseCase = new FinderOrderUseCase(orderRepository);

    const orderResponse = await finderOrderUseCase.run(orderId, currentUserId);

    res.send(orderResponse);
}