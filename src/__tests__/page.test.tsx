import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home page — Hero', () => {
  it('renders the hero name heading', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Tatiana Mansilla')
  })

  it('renders the fullstack title', () => {
    render(<Home />)
    const h2 = screen.getByRole('heading', { level: 2 })
    expect(h2).toBeInTheDocument()
    expect(h2.textContent).toMatch(/Fullstack/i)
  })

  it('renders the primary CTA linking to projects', () => {
    render(<Home />)
    const cta = screen.getByRole('link', { name: /ver proyectos/i })
    expect(cta).toHaveAttribute('href', '#proyectos')
  })

  it('renders the secondary CTA linking to contact', () => {
    render(<Home />)
    const cta = screen.getByRole('link', { name: /contactame/i })
    expect(cta).toHaveAttribute('href', '/contacto')
  })

  it('renders the description paragraph', () => {
    render(<Home />)
    expect(screen.getByText(/Construyo aplicaciones web modernas/i)).toBeInTheDocument()
  })
})
