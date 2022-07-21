import { Router } from "express"

import authRouter from "./authRouter.js"
import testsRouter from "./testsRouter.js"

const routes = Router()

routes.use(authRouter)
routes.use(testsRouter)

export default routes
