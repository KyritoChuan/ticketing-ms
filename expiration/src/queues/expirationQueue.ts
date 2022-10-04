import Queue from 'bull';
import { ExpirationCompletePublisher } from '../events/publishers/expirationCompletePublisher';
import { natsWrapper } from '../utils/natsWrapper';


interface Payload {
    orderId: string;
}

const expirationQueue = new Queue<Payload>('order:expiration', {
    redis: {
        host: process.env.REDIS_HOST
    },
});

expirationQueue.process(async (job) => {
    new ExpirationCompletePublisher(natsWrapper.client).publish({
        orderId: job.data.orderId,
    });

    // console.log(
    //     "I wanna publish an expiration:complete event for orderID.",
    //     job.data.orderId
    // );
})

export { expirationQueue };