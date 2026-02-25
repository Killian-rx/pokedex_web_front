import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import createCustomTheme from '../theme/theme.js'
import { LanguageProvider } from '../contexts/LanguageContext.jsx'
import PokemonList from '../components/pokemon_list.jsx'

// Mock des données
vi.mock('../data/pokemon.json', () => ({
  default: [
    {
      id: 1,
      names: { fr: 'Bulbizarre', en: 'Bulbasaur' },
      image: 'test-image-1.png',
      types: ['grass', 'poison']
    },
    {
      id: 25,
      names: { fr: 'Pikachu', en: 'Pikachu' },
      image: 'test-image-25.png',
      types: ['electric']
    },
    {
      id: 4,
      names: { fr: 'Salamèche', en: 'Charmander' },
      image: 'test-image-4.png',
      types: ['fire']
    }
  ]
}))

vi.mock('../data/types.json', () => ({
  default: {
    grass: {
      translations: { fr: 'Plante', en: 'Grass' },
      backgroundColor: '#78C850'
    },
    poison: {
      translations: { fr: 'Poison', en: 'Poison' },
      backgroundColor: '#A040A0'
    },
    electric: {
      translations: { fr: 'Électrique', en: 'Electric' },
      backgroundColor: '#F8D030'
    },
    fire: {
      translations: { fr: 'Feu', en: 'Fire' },
      backgroundColor: '#F08030'
    }
  }
}))

// Wrapper pour fournir les contextes nécessaires
const PokemonListWrapper = ({ searchTerm }) => {
  const theme = createCustomTheme('light')
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <LanguageProvider>
          <PokemonList searchTerm={searchTerm} />
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

describe('PokemonList Component', () => {
  it('should render all pokemon when no search term', () => {
    render(<PokemonListWrapper searchTerm="" />)
    
    expect(screen.getByText('Pokédex (3 Pokémon)')).toBeInTheDocument()
    expect(screen.getByText('Bulbizarre')).toBeInTheDocument()
    expect(screen.getByText('Pikachu')).toBeInTheDocument()
    expect(screen.getByText('Salamèche')).toBeInTheDocument()
  })

  it('should filter pokemon by name', () => {
    render(<PokemonListWrapper searchTerm="Pikachu" />)
    
    expect(screen.getByText('Résultats pour "Pikachu" (1)')).toBeInTheDocument()
    expect(screen.getByText('Pikachu')).toBeInTheDocument()
    expect(screen.queryByText('Bulbizarre')).not.toBeInTheDocument()
  })

  it('should filter pokemon by type', () => {
    render(<PokemonListWrapper searchTerm="Électrique" />)
    
    expect(screen.getByText('Résultats pour "Électrique" (1)')).toBeInTheDocument()
    expect(screen.getByText('Pikachu')).toBeInTheDocument()
    expect(screen.queryByText('Bulbizarre')).not.toBeInTheDocument()
  })

  it('should show no results message when no pokemon found', () => {
    render(<PokemonListWrapper searchTerm="Inexistant" />)
    
    expect(screen.getByText('Aucun Pokémon trouvé pour "Inexistant"')).toBeInTheDocument()
    expect(screen.getByText('Essayez de rechercher par nom, numéro ou type.')).toBeInTheDocument()
  })

  it('should filter pokemon by ID', () => {
    render(<PokemonListWrapper searchTerm="25" />)
    
    expect(screen.getByText('Pikachu')).toBeInTheDocument()
    expect(screen.queryByText('Bulbizarre')).not.toBeInTheDocument()
  })

  it('should display correct grid layout', () => {
    render(<PokemonListWrapper searchTerm="" />)
    
    // Vérifier que le container existe et contient les cartes Pokémon
    const pokemonCards = screen.getAllByRole('img')
    expect(pokemonCards).toHaveLength(3) // 3 Pokémon dans nos données mockées
    
    // Vérifier que les noms des Pokémon mockés sont affichés
    expect(screen.getByText('Bulbizarre')).toBeInTheDocument()
    expect(screen.getByText('Pikachu')).toBeInTheDocument()  
    expect(screen.getByText('Salamèche')).toBeInTheDocument()
  })
})