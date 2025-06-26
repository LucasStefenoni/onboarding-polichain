// Caminho: app/api/jogadores/route.ts

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const jogadores = await prisma.jogador.findMany({
      orderBy: { pontos: 'desc' },
    });
    return NextResponse.json(jogadores);
  } catch (error) {
    console.error("Erro ao buscar jogadores:", error);
    return NextResponse.json(
      { message: "Ocorreu um erro ao buscar os jogadores." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { nome } = await request.json();

    if (!nome) {
      return NextResponse.json({ message: "O campo 'nome' é obrigatório." }, { status: 400 });
    }

    const novoJogador = await prisma.jogador.create({ data: { nome } });
    
    return NextResponse.json(novoJogador, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar jogador:", error);
    return NextResponse.json(
      { message: "Ocorreu um erro ao criar o jogador." },
      { status: 500 }
    );
  }
}