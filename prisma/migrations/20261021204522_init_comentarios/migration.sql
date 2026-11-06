-- CreateEnum
CREATE TYPE "EstadoComentario" AS ENUM ('PENDIENTE', 'APROBADO', 'RECHAZADO');

-- CreateTable
CREATE TABLE "Comentario" (
    "id" TEXT NOT NULL,
    "nombre" VARCHAR(60) NOT NULL,
    "texto" VARCHAR(500) NOT NULL,
    "estado" "EstadoComentario" NOT NULL DEFAULT 'PENDIENTE',
    "caso" TEXT,
    "ipHash" VARCHAR(64),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comentario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Comentario_estado_createdAt_idx" ON "Comentario"("estado", "createdAt");

-- CreateIndex
CREATE INDEX "Comentario_ipHash_createdAt_idx" ON "Comentario"("ipHash", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_usuario_key" ON "Admin"("usuario");
