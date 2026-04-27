import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { contactSchema } from '@/lib/validations/contact'

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Cuerpo de la solicitud inválido.' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Datos inválidos.', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }

  // Honeypot check
  if (parsed.data.website) {
    return NextResponse.json({ ok: true }, { status: 201 })
  }

  const { nombre, email, mensaje } = parsed.data

  const rawIp = request.headers.get('x-forwarded-for') ?? 'unknown'
  const ipHash = crypto.createHash('sha256').update(rawIp).digest('hex')

  try {
    const { db } = await import('@/lib/db')
    const { contactMessages } = await import('@/lib/db/schema')

    await db.insert(contactMessages).values({ nombre, email, mensaje, ipHash })

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (err) {
    console.error('[api/contact] DB error:', err)
    return NextResponse.json({ error: 'Servicio no disponible.' }, { status: 503 })
  }
}
