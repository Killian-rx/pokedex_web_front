import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import createCustomTheme from '../theme/theme.js'
import PokemonCard from '../components/pokemon_card.jsx'

// Mock des données de test
const mockPokemon = {
  id: 25,
  name: 'Pikachu',
  image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  types: [
    {
      name: 'Électrique',
      backgroundColor: '#F7D02C'
    }
  ]
}

// Wrapper pour fournir les contextes nécessaires
const PokemonCardWrapper = ({ children }) => {
  const theme = createCustomTheme('light')
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </BrowserRouter>
  )
}

describe('PokemonCard Component', () => {
  it('should render pokemon name correctly', () => {
    render(
      <PokemonCardWrapper>
        <PokemonCard pokemon={mockPokemon} />
      </PokemonCardWrapper>
    )
    
    expect(screen.getByText('Pikachu')).toBeInTheDocument()
  })

  it('should render pokemon ID with correct format', () => {
    render(
      <PokemonCardWrapper>
        <PokemonCard pokemon={mockPokemon} />
      </PokemonCardWrapper>
    )
    
    expect(screen.getByText('#025')).toBeInTheDocument()
  })

  it('should render pokemon types', () => {
    render(
      <PokemonCardWrapper>
        <PokemonCard pokemon={mockPokemon} />
      </PokemonCardWrapper>
    )
    
    expect(screen.getByText('Électrique')).toBeInTheDocument()
  })

  it('should have correct CSS classes', () => {
    render(
      <PokemonCardWrapper>
        <PokemonCard pokemon={mockPokemon} />
      </PokemonCardWrapper>
    )
    
    const card = screen.getByText('Pikachu').closest('.pokemon-card')
    expect(card).toHaveClass('pokemon-card')
  })

  it('should display image with correct alt text', () => {
    render(
      <PokemonCardWrapper>
        <PokemonCard pokemon={mockPokemon} />
      </PokemonCardWrapper>
    )
    
    const image = screen.getByAltText('Pikachu')
    expect(image).toBeInTheDocument()
    expect(image).toHaveClass('pokemon-card-image')
  })

  it('should apply type background color', () => {
    render(
      <PokemonCardWrapper>
        <PokemonCard pokemon={mockPokemon} />
      </PokemonCardWrapper>
    )
    
    const typeChip = screen.getByText('Électrique')
    expect(typeChip).toHaveStyle('background-color: #F7D02C')
  })
})