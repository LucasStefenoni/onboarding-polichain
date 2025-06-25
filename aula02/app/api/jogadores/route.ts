// Caminho: app/api/jogadores/route.ts

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Rota para buscar todos os jogadores
export async function GET() {
  try {
    // CORREÇÃO: Usando 'prisma.jogador' com 'j' minúsculo
    const jogadores = await prisma.jogador.findMany({
      orderBy: { pontos: 'desc' },
    });
    return NextResponse.json(jogadores);
  } catch (error) {
    console.error("Erro ao buscar jogadores:", error);
    // Adicionando tratamento de erro para retornar um JSON em caso de falha
    return NextResponse.json(
      { message: "Ocorreu um erro ao buscar os jogadores." },
      { status: 500 }
    );
  }
}

// Rota para criar um novo jogador
export async function POST(request: Request) {
  try {
    const { nome } = await request.json();

    if (!nome) {
      return NextResponse.json({ message: "O campo 'nome' é obrigatório." }, { status: 400 });
    }

    // CORREÇÃO: Usando 'prisma.jogador' com 'j' minúsculo
    // Também mudei o nome da variável para 'novoJogador' para evitar confusão.
    const novoJogador = await prisma.jogador.create({ data: { nome } });
    
    return NextResponse.json(novoJogador, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar jogador:", error);
    // Adicionando tratamento de erro para retornar um JSON em caso de falha
    return NextResponse.json(
      { message: "Ocorreu um erro ao criar o jogador." },
      { status: 500 }
    );
  }
}