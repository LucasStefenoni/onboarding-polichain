import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

type RouteParams = { params: { id: string } };

export async function POST(request: Request, { params }: RouteParams) {
    try{
        const id = parseInt(params.id, 10);
        if (isNaN(id)) {
            return NextResponse.json({ message: 'ID de jogador inválido fornecido.' }, { status: 400 }); // 400 = Bad Request
        }
        const updatedJogador = await prisma.jogador.update({
        where: { id: id },
        data: {
            pontos: {
            increment: 1, 
            },
        },
        });
        return NextResponse.json(updatedJogador);
    } catch(err){
        return NextResponse.json(
      { message: "Não foi possível encontrar o jogador ou atualizar os pontos." },
      { status: 500 });
    }
}