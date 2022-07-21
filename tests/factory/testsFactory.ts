import { faker } from "@faker-js/faker"
import supertest from "supertest"

import app from "../../src/app.js"
import userFactory from "./userFactory.js"

function createTestData() {
  return {
    name: faker.name.jobArea(),
    pdfUrl: faker.internet.url(),
    category: "Projeto",
    discipline: "JavaScript",
    teacher: "Diego Pinho",
  }
}

async function createToken() {
  const user = userFactory.createUserData()
  await supertest(app).post("/signup").send(user)

  const data = {
    email: user.email,
    password: user.password,
  }
  const response = await supertest(app).post("/signin").send(data)
  return response.body.token
}

const testsFactory = {
  createTestData,
  createToken,
}

export default testsFactory
