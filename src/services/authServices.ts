import { Users } from "@prisma/client"
import bcrypt from "bcrypt"
import dotenv from "dotenv"

import * as Error from "../middlewares/errorHandler.js"
import * as Repository from "../repositories/authRepository.js"

dotenv.config()

export async function validatePasswordAndEmail(email: string, password: string, confirmPassword: string) {
  if (password !== confirmPassword) {
    Error.errorUnprocessable("The passwords are different")
  }

  const user = await Repository.findUserByEmail(email)
  if (user) {
    Error.errorConflict("This email is already in use")
  }
}

export async function createUser(data: Omit<Users, "id">) {
  data.password = bcrypt.hashSync(data.password, Number(process.env.BCRYPT_SALT))
  await Repository.createUser(data)
}
