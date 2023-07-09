import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';
import { json } from 'express';
declare global {
  var signin: () => string[];
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';

  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});

});

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

global.signin = () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const token = jwt.sign({id: id, email: "test@test.com"}, process.env.JWT_KEY!);
  const sessinJson = JSON.stringify({jwt: token});
  const base64 = Buffer.from(sessinJson).toString("base64");
  return [`session=${base64}`];
}