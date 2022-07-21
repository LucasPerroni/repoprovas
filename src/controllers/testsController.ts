import { Request, Response } from "express"

import { TestSchema } from "../schemas/testsSchema.js"
import testsServices from "../services/testsServices.js"

export async function createTest(req: Request, res: Response) {
  const { userId } = res.locals
  const { name, pdfUrl, category, discipline, teacher }: TestSchema = req.body

  const { categoryId, teacherDisciplineId } = await testsServices.validateData({
    category,
    discipline,
    teacher,
  })

  await testsServices.createTest({ name, pdfUrl, categoryId, teacherDisciplineId })

  res.sendStatus(201)
}
