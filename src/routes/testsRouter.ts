import { Router } from "express"

import { createTest, getTestByDiscipline } from "../controllers/testsController.js"
import validateSchema from "../middlewares/validateSchema.js"
import validateToken from "../middlewares/validateToken.js"
import testsSchema from "../schemas/testsSchema.js"

const testsRouter = Router()

testsRouter.post("/tests", validateToken, validateSchema(testsSchema), createTest)
testsRouter.get("/tests", validateToken, getTestByDiscipline)

export default testsRouter
