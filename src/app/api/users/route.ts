import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Método GET para buscar todos os usuários
export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

// Método POST para adicionar um novo usuário
export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();
    console.log("Recebendo dados:", { name, email });

    const user = await prisma.user.create({ data: { name, email } });
    console.log("Usuário adicionado com sucesso:", user);

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Erro ao adicionar usuário:", error);
    return NextResponse.json({ error: "Erro ao adicionar usuário" }, { status: 500 });
  }
}
