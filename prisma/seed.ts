import { prisma } from "../src/config/database.js"

async function main() {
  await terms()
  await categories()
  await teachers()
  await disciplines()
  await teacherDisciplines()
}

async function terms() {
  await prisma.terms.createMany({
    data: [{ number: 1 }, { number: 2 }, { number: 3 }, { number: 4 }, { number: 5 }, { number: 6 }],
    skipDuplicates: true,
  })
}

async function categories() {
  await prisma.categories.createMany({
    data: [{ name: "Projeto" }, { name: "Prática" }, { name: "Recuperação" }],
    skipDuplicates: true,
  })
}

async function teachers() {
  await prisma.teachers.createMany({
    data: [{ name: "Diego Pinho" }, { name: "Bruna Hamori" }],
    skipDuplicates: true,
  })
}

async function disciplines() {
  await prisma.disciplines.createMany({
    data: [
      { name: "HTML e CSS", termId: 1 },
      { name: "JavaScript", termId: 2 },
      { name: "React", termId: 3 },
      { name: "Humildade", termId: 1 },
      { name: "Planejamento", termId: 2 },
      { name: "Autoconfiança", termId: 3 },
    ],
    skipDuplicates: true,
  })
}

async function teacherDisciplines() {
  await prisma.teacherDisciplines.createMany({
    data: [
      { teacherId: 1, disciplineId: 1 },
      { teacherId: 1, disciplineId: 2 },
      { teacherId: 1, disciplineId: 3 },
      { teacherId: 2, disciplineId: 4 },
      { teacherId: 2, disciplineId: 5 },
      { teacherId: 2, disciplineId: 6 },
    ],
    skipDuplicates: true,
  })
}

main()
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
