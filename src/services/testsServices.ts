import { Tests } from "@prisma/client"

import { TestSchema } from "../schemas/testsSchema.js"
import testsRepository from "../repositories/testsRepository.js"
import * as Error from "../middlewares/errorHandler.js"

async function validateData(data: Omit<TestSchema, "name" | "pdfUrl">) {
  const teacherDiscipline = await testsRepository.getTeacherDisciplineByNames(data.teacher, data.discipline)
  if (!teacherDiscipline) {
    Error.errorNotFound("Couldn't find a this combination teacher-discipline")
  }

  const category = await testsRepository.getCategoryByName(data.category)
  if (!category) {
    Error.errorNotFound("Couldn't find this category")
  }

  return { categoryId: category.id, teacherDisciplineId: teacherDiscipline.id }
}

async function createTest(data: Omit<Tests, "id">) {
  await testsRepository.createTest(data)
}

const testsServices = {
  validateData,
  createTest,
}

export default testsServices
