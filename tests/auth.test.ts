import supertest from "supertest"

import { prisma } from "../src/config/database.js"
import app from "../src/app.js"
import userFactory from "./factory/userFactory.js"

beforeEach(async () => {
  const email = "randomname@gmail.com"
  await prisma.$executeRaw`DELETE FROM users WHERE email = ${email}`
})

afterEach(async () => {
  await prisma.$disconnect()
})

afterAll(async () => {
  const email = "randomname@gmail.com"
  await prisma.$executeRaw`DELETE FROM users WHERE email = ${email}`
})

describe("POST /signup", () => {
  it("Should create a user with status 201", async () => {
    const data = userFactory.createUserData()

    const response = await supertest(app).post("/signup").send(data)
    const userCreated = await prisma.users.findUnique({ where: { email: data.email } })

    expect(response.status).toBe(201)
    expect(userCreated).not.toBeNull()
  })

  it("Shouldn't create a user with status 409 (existent email)", async () => {
    const data = userFactory.createUserData()

    await supertest(app).post("/signup").send(data)
    const response = await supertest(app).post("/signup").send(data)
    expect(response.status).toBe(409)
  })

  it("Shouldn't create a user with status 422 (wrong confirmPassword)", async () => {
    const data = userFactory.createUserData()

    const response = await supertest(app)
      .post("/signup")
      .send({ ...data, confirmPassword: "wrongpassword" })
    expect(response.status).toBe(422)
  })

  it("Shouldn't create a user with status 422 (wrong data)", async () => {
    const data = {}

    const response = await supertest(app).post("/signup").send(data)
    expect(response.status).toBe(422)
  })
})

describe("POST /signin", () => {
  it("Should return a token with status 200", async () => {
    const user = userFactory.createUserData()
    await supertest(app).post("/signup").send(user)

    const data = {
      email: user.email,
      password: user.password,
    }
    const response = await supertest(app).post("/signin").send(data)
    expect(response.status).toBe(200)
    expect(response.body.token).not.toBeUndefined()
  })

  it("Should return status 401 without token (wrong password)", async () => {
    const user = userFactory.createUserData()
    await supertest(app).post("/signup").send(user)

    const data = {
      email: user.email,
      password: "wrongpassword",
    }
    const response = await supertest(app).post("/signin").send(data)
    expect(response.status).toBe(401)
    expect(response.body.token).toBeUndefined()
  })
})
