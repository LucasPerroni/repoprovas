import joi from "joi"

export interface TestSchema {
  name: string
  pdfUrl: string
  category: string
  discipline: string
  teacher: string
}

const testsSchema = joi.object<TestSchema>({
  name: joi.string().required(),
  pdfUrl: joi.string().uri().required(),
  category: joi.string().required(),
  discipline: joi.string().required(),
  teacher: joi.string().required(),
})

export default testsSchema
