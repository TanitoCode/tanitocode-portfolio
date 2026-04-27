import { z } from 'zod'

export const contactSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres.').max(100),
  email: z.string().email('Ingresá un email válido.').max(200),
  mensaje: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres.').max(2000),
  website: z.string().max(0, 'Honeypot detectado.').optional(),
})

export type ContactInput = z.infer<typeof contactSchema>
