import joi from "joi"

import { CreateUser } from "./signupSchema.js"

const signinSchema = joi.object<Omit<CreateUser, "confirmPassword">>({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
})

export default signinSchema
