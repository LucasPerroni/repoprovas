import { Request, Response } from "express"

import { TestSchema } from "../schemas/testsSchema.js"
import testsServices from "../services/testsServices.js"
import testsRepository from "../repositories/testsRepository.js"

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

export async function getTestByDiscipline(req: Request, res: Response) {
  const tests = await testsRepository.getTestsByDiscipline()
  res.status(200).send({ tests })
}

export async function getTestByTeacher(req: Request, res: Response) {
  const teachers = await testsRepository.getTestsByTeacher()
  res.status(200).send({ teachers })
}
