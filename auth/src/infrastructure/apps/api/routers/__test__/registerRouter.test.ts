import request from 'supertest';
import app from '../../app';

it('returns a 201 on successful sign up', async () => {
    return request(app).post('/api/users/register').send({
        email: "test@test.com",
        password: "password",
        repeatPassword: "password",
    }).expect(201);
});

it('returns a 400 with an invalid email', async () => {
    return request(app).post('/api/users/register').send({
        email: "testingfail",
        password: "failed",
        repeatPassword: "failed"
    }).expect(400);
});

it('returns a 400 with an missing email and password', async () => {
    await request(app).post('/api/users/register').send({
        email: "testingfail"
    }).expect(400);

    await request(app).post('/api/users/register').send({
        password: "testingfail",
        repeatPassword: "testingfail",
    }).expect(400);
});

it('disallows duplicate emails', async () => {
    await request(app).post('/api/users/register').send({
        email: "test@test.com",
        password: "password",
        repeatPassword: "password",
    }).expect(201);

    await request(app).post('/api/users/register').send({
        email: "test@test.com",
        password: "password",
        repeatPassword: "password",
    }).expect(400);
});

it('the passwords are not the same', async () => {
    return await request(app).post('/api/users/register').send({
        email: "test@test.com",
        password: "password",
        repeatPassword: "not equal",
    }).expect(400);
});

it('sets a cookie after successful signup', async () => {
    const response = await request(app).post('/api/users/register').send({
        email: "test@test.com",
        password: "password",
        repeatPassword: "password",
    }).expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});