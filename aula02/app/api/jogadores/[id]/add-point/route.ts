import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const jogadorId = parseInt(params.id, 10);

    if (isNaN(jogadorId)) {
      return NextResponse.json({ message: 'O ID do jogador é inválido.' }, { status: 400 });
    }

    const jogadorAtualizado = await prisma.jogador.update({
      where: {
        id: jogadorId,
      },
      data: {
        pontos: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(jogadorAtualizado);

  } catch (error) {
    console.error("Erro ao adicionar ponto:", error);

    return NextResponse.json(
      { message: "Não foi possível adicionar o ponto. Verifique se o jogador existe." },
      { status: 500 }
    );
  }
}