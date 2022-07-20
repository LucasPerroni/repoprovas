import { Users } from "@prisma/client"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

import * as Error from "../middlewares/errorHandler.js"
import * as Repository from "../repositories/authRepository.js"

dotenv.config()

export async function createUser(data: Omit<Users, "id">) {
  data.password = bcrypt.hashSync(data.password, Number(process.env.BCRYPT_SALT))
  await Repository.createUser(data)
}

export async function getUserByEmail(email: string, blockExistentUser: boolean = false) {
  const user = await Repository.findUserByEmail(email)

  if (blockExistentUser && user) {
    Error.errorConflict("This email is already in use")
  } else if (!blockExistentUser && !user) {
    Error.errorNotFound("Couldn't find a user with that email")
  }

  return user
}

export function checkPassword(user: Users, password: string) {
  if (!bcrypt.compareSync(password, user.password)) {
    Error.errorUnauthorized("Wrong password")
  }
}

export function createToken(user: Users) {
  const data = { userId: user.id }
  const key = process.env.JWT_KEY
  const config = { expiresIn: 60 * 60 } // 60 minutes

  const token = jwt.sign(data, key, config)
  return token
}
