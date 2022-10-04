import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';


declare global {
    var registerTest: (id?: string) => string[];
}

jest.mock('./natsWrapper.ts');

process.env.STRIPE_KEY = 'sk_test_51LnQh8FAoHrI35B7XES8C1JeMPJeTzL5trrXdX7Qt5B9IZe8tcmN1mCxDlrSzoNkwUE1qeVUmScwqxoN65PxrIhd00WWGX2x7h';

let mongo: MongoMemoryServer;

beforeAll(async () => {
    process.env.JWT_KEY = "testKey";
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();

    await mongoose.connect(uri);
})

beforeEach(async () => {
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
});

global.registerTest = (id?: string) => {
    //Build a JWT payload. { id, email }
    const payload = {
        id: id || new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com'
    }

    //Create a JWT.
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    //Build session Object. { jwt: MY_JWT }
    const session = { jwt: token };

    //Turn that session into JSON
    const sessionJSON = JSON.stringify(session);

    //Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');

    //return a string thats the cookie with the encoded data.
    return [`session=${base64}`];
}