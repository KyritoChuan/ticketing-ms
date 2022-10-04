import { Request, Response } from "express";
import { FinderAllOrdersUseCase } from '../../../../application/finderAllOrdersUseCase';
import { MongoOrderRepository } from '../../../persistence/mongoDB/mongoOrderRepository';





export async function indexOrderController(req: Request, res: Response) {
    const currentUserId = req.currentUser!.id;

    const orderRepository = new MongoOrderRepository();
    const finderAllOrdersUseCase = new FinderAllOrdersUseCase(orderRepository);

    const orders = await finderAllOrdersUseCase.run(currentUserId);

    res.send(orders);
}