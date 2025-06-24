import {NextResponse} from 'next/server'
import {prisma} from '@/lib/prisma'

export async function PUT(request:Request, {params}: {params: {id:string}}) {
    const id = await Number(params.id)
    const [pontos] = await request.json()
    const updated = await prisma.Jogador.update({where: {id}, data: {pontos}})
    return NextResponse.json(updated)
}

export async function DELETE(request:Request, {params}: {params: {id:string}}) {
    const id = Number(params.id)
    const updated = await prisma.Jogador.delete({where: {id}})
    return NextResponse.json({ok: true})
}