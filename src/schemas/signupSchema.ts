import joi from "joi"

export interface CreateUser {
  email: string
  password: string
  confirmPassword: string
}

const signupSchema = joi.object<CreateUser>({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  confirmPassword: joi.string().min(6).required(),
})

export default signupSchema
