import {NextResponse} from 'next/server'
import {prisma} from '@/lib/prisma'

export async function PUT(request:Request, {params}: {params: Promise<{id:string}>}) {
    const id = Number((await params).id)
    const [pontos] = await request.json()
    const updated = await prisma.jogador.update({where: {id}, data: {pontos}})
    return NextResponse.json(updated)
}

export async function DELETE(request:Request, {params}: {params: Promise<{id:string}>}) {
    const id = Number((await params).id)
    const updated = await prisma.jogador.delete({where: {id}})
    return NextResponse.json({ok: true})
}