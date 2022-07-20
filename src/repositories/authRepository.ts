import { Users } from "@prisma/client"

import { prisma } from "../config/database.js"

export async function createUser(data: Omit<Users, "id">) {
  await prisma.users.create({ data })
}

export async function findUserByEmail(email: string) {
  const user = await prisma.users.findUnique({ where: {email} })
  return user
}
