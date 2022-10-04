import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';


declare global {
    var registerTest: () => Promise<string[]>;
}

let mongo: MongoMemoryServer;

beforeAll(async () => {
    process.env.JWT_KEY = "testKey";
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();

    await mongoose.connect(uri);
})

beforeEach(async () => {
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

global.registerTest = async () => {
    const email = 'test@test.com';
    const password = 'password';

    const response = await request(app).post('/api/users/register').send({
        email, password, repeatPassword: password
    }).expect(201);

    const cookie = response.get('Set-Cookie');
    return cookie;
}