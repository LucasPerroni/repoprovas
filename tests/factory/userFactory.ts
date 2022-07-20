import { faker } from "@faker-js/faker"

function createUserData() {
  const password = faker.internet.password()

  return {
    email: "randomname@gmail.com",
    password: password,
    confirmPassword: password,
  }
}

const userFactory = {
  createUserData,
}

export default userFactory
