import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core'

export const contactMessages = pgTable('contact_messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  nombre: text('nombre').notNull(),
  email: text('email').notNull(),
  mensaje: text('mensaje').notNull(),
  ipHash: text('ip_hash'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
