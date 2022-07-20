/*
  Warnings:

  - A unique constraint covering the columns `[teacherId,disciplineId]` on the table `teacherDisciplines` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "teacherDisciplines_teacherId_disciplineId_key" ON "teacherDisciplines"("teacherId", "disciplineId");
