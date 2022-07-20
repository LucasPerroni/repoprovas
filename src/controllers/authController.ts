import { Request, Response } from "express"

import { CreateUser } from "../schemas/signupSchema.js"
import * as Services from "../services/authServices.js"
import * as Error from "../middlewares/errorHandler.js"

export async function signUp(req: Request, res: Response) {
  const { email, password, confirmPassword }: CreateUser = req.body

  if (password !== confirmPassword) {
    Error.errorUnprocessable("The passwords are different")
  }

  await Services.getUserByEmail(email, true)
  await Services.createUser({ email, password })

  res.sendStatus(201)
}

export async function signIn(req: Request, res: Response) {
  const { email, password }: CreateUser = req.body

  const user = await Services.getUserByEmail(email)
  Services.checkPassword(user, password)
  const token = Services.createToken(user)

  res.status(200).send({ token })
}
