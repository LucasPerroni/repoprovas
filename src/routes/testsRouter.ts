import { Router } from "express"

import { createTest } from "../controllers/testsController.js"
import validateSchema from "../middlewares/validateSchema.js"
import validateToken from "../middlewares/validateToken.js"
import testsSchema from "../schemas/testsSchema.js"

const testsRouter = Router()

testsRouter.post("/tests", validateToken, validateSchema(testsSchema), createTest)

export default testsRouter
