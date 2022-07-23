import { Router } from "express"

import { createTest, getTestByDiscipline, getTestByTeacher } from "../controllers/testsController.js"
import validateSchema from "../middlewares/validateSchema.js"
import validateToken from "../middlewares/validateToken.js"
import testsSchema from "../schemas/testsSchema.js"

const testsRouter = Router()

testsRouter.post("/tests", validateToken, validateSchema(testsSchema), createTest)
testsRouter.get("/tests/disciplines", validateToken, getTestByDiscipline)
testsRouter.get("/tests/teachers", validateToken, getTestByTeacher)

export default testsRouter
