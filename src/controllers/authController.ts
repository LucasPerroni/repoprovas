import { Request, Response } from "express"

import { CreateUser } from "../schemas/signupSchema.js"
import * as Services from "../services/authServices.js"

export async function signUp(req: Request, res: Response) {
  const { email, password, confirmPassword }: CreateUser = req.body

  await Services.validatePasswordAndEmail(email, password, confirmPassword)
  await Services.createUser({ email, password })

  res.sendStatus(201)
}

export async function signIn(req: Request, res: Response) {
  const { email, password }: CreateUser = req.body
  res.sendStatus(200)
}
