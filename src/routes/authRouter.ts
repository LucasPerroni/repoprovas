import { Router } from "express"

import { signIn, signUp } from "../controllers/authController.js"
import validateSchema from "../middlewares/validateSchema.js"
import signinSchema from "../schemas/signinSchema.js"
import signupSchema from "../schemas/signupSchema.js"

const authRouter = Router()

authRouter.post("/signup", validateSchema(signupSchema), signUp)
authRouter.post("/signin", validateSchema(signinSchema), signIn)

export default authRouter
