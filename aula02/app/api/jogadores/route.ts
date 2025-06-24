// app/api/jogatores
import {NextResponse} from 'next/server'
import {prisma} from '@/lib/prisma'

export async function GET() {
    const jogadores = await prisma.Jogador.findMany({orderBy: {pontos: 'desc'}})
    return NextResponse.json(jogadores)
}

export async function POST(request : Request ) {
    const {nome} = await request.json()
    const Jogador = await prisma.Jogador.create({data: {nome}})
    return NextResponse.json(Jogador, {status:201})
}

