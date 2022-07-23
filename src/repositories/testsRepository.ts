import { Tests } from "@prisma/client"

import { prisma } from "../config/database.js"

async function createTest(data: Omit<Tests, "id">) {
  await prisma.tests.create({ data })
}

async function getTeacherByName(name: string) {
  const teacher = await prisma.teachers.findUnique({ where: { name } })
  return teacher
}

async function getDisciplineByName(name: string) {
  const discipline = await prisma.disciplines.findUnique({ where: { name } })
  return discipline
}

async function getCategoryByName(name: string) {
  const category = await prisma.categories.findUnique({ where: { name } })
  return category
}

async function getTeacherDisciplineByNames(teacher: string, discipline: string) {
  const teacherDiscipline = await prisma.teacherDisciplines.findFirst({
    where: { teacher: { name: teacher }, discipline: { name: discipline } },
    select: { id: true, teacher: { select: { name: true } }, discipline: { select: { name: true } } },
  })
  return teacherDiscipline
}

async function getTestsByDiscipline() {
  const tests = await prisma.terms.findMany({
    select: {
      id: true,
      number: true,
      Disciplines: {
        select: {
          id: true,
          name: true,
          TeacherDisciplines: {
            select: {
              teacher: {
                select: { name: true },
              },
              Tests: {
                select: {
                  id: true,
                  name: true,
                  pdfUrl: true,
                  category: { select: { id: true } },
                },
              },
            },
          },
        },
      },
    },
  })

  return tests
}

async function getTestsByTeacher() {
  const teachers = await prisma.teachers.findMany({
    select: {
      id: true,
      name: true,
      TeacherDisciplines: {
        select: {
          discipline: { select: { id: true, name: true } },
          Tests: {
            select: {
              id: true,
              name: true,
              pdfUrl: true,
              category: { select: { id: true, name: true } },
            },
          },
        },
      },
    },
  })

  return teachers
}

const testsRepository = {
  createTest,
  getTeacherByName,
  getDisciplineByName,
  getCategoryByName,
  getTeacherDisciplineByNames,
  getTestsByDiscipline,
  getTestsByTeacher,
}

export default testsRepository
