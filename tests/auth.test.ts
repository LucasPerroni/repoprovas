import supertest from "supertest"

import { prisma } from "../src/config/database.js"
import app from "../src/app.js"

beforeEach(async () => {
  const email = "randomname@gmail.com"

  await prisma.$executeRaw`DELETE FROM users WHERE email = ${email}`
})

afterEach(async () => {
  await prisma.$disconnect()
})

describe("POST /signup", () => {
  it("Should create a user with status 201", async () => {
    const data = {
      email: "randomname@gmail.com",
      password: "randompassword",
      confirmPassword: "randompassword",
    }

    const response = await supertest(app).post("/signup").send(data)
    const userCreated = await prisma.users.findUnique({ where: { email: data.email } })

    expect(response.status).toBe(201)
    expect(userCreated).not.toBeNull()
  })

  it("Shouldn't create a user with status 409 (existent email)", async () => {
    const data = {
      email: "randomname@gmail.com",
      password: "randompassword",
      confirmPassword: "randompassword",
    }

    await supertest(app).post("/signup").send(data)
    const response = await supertest(app).post("/signup").send(data)
    expect(response.status).toBe(409)
  })

  it("Shouldn't create a user with status 422 (wrong confirmPassword)", async () => {
    const data = {
      email: "randomname@gmail.com",
      password: "randompassword",
      confirmPassword: "randompassword2",
    }

    const response = await supertest(app).post("/signup").send(data)
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
    const createUser = {
      email: "randomname@gmail.com",
      password: "randompassword",
      confirmPassword: "randompassword",
    }
    await supertest(app).post("/signup").send(createUser)

    const data = {
      email: "randomname@gmail.com",
      password: "randompassword",
    }
    const response = await supertest(app).post("/signin").send(data)
    expect(response.status).toBe(200)
    expect(response.body.token).not.toBeUndefined()
  })

  it("Should return status 401 without token (wrong password)", async () => {
    const createUser = {
      email: "randomname@gmail.com",
      password: "randompassword",
      confirmPassword: "randompassword",
    }
    await supertest(app).post("/signup").send(createUser)

    const data = {
      email: "randomname@gmail.com",
      password: "wrongpassword",
    }
    const response = await supertest(app).post("/signin").send(data)
    expect(response.status).toBe(401)
    expect(response.body.token).toBeUndefined()
  })
})
