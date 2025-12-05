import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '@mui/material/styles'
import createCustomTheme from '../theme/theme.js'
import SearchBar from '../components/search_bar.jsx'
import { LanguageProvider } from '../contexts/LanguageContext.jsx'

// Mock des données pour éviter les erreurs d'import
vi.mock('../data/pokemon.json', () => ({
  default: [
    {
      id: 1,
      names: { fr: 'Bulbizarre', en: 'Bulbasaur' },
      image: 'test-image.png',
      types: ['grass', 'poison']
    },
    {
      id: 25,
      names: { fr: 'Pikachu', en: 'Pikachu' },
      image: 'test-image.png',
      types: ['electric']
    }
  ]
}))

vi.mock('../data/types.json', () => ({
  default: {
    grass: {
      translations: { fr: 'Plante', en: 'Grass' },
      backgroundColor: '#78C850'
    },
    electric: {
      translations: { fr: 'Électrique', en: 'Electric' },
      backgroundColor: '#F8D030'
    }
  }
}))

// Wrapper pour fournir les contextes nécessaires
const SearchBarWrapper = ({ children, onSearch }) => {
  const theme = createCustomTheme('light')
  return (
    <ThemeProvider theme={theme}>
      <LanguageProvider>
        <SearchBar onSearch={onSearch} />
      </LanguageProvider>
    </ThemeProvider>
  )
}

describe('SearchBar Component', () => {
  it('should render search input with correct placeholder', () => {
    const mockOnSearch = vi.fn()
    
    render(
      <SearchBarWrapper onSearch={mockOnSearch} />
    )
    
    const input = screen.getByPlaceholderText(/Rechercher un Pokémon ou un type/)
    expect(input).toBeInTheDocument()
  })

  it('should call onSearch when Enter key is pressed', async () => {
    const user = userEvent.setup()
    const mockOnSearch = vi.fn()
    
    render(
      <SearchBarWrapper onSearch={mockOnSearch} />
    )
    
    const input = screen.getByRole('combobox')
    await user.type(input, 'Pikachu')
    await user.keyboard('{Enter}')
    
    expect(mockOnSearch).toHaveBeenCalledWith('Pikachu')
  })

  it('should update input value when typing', async () => {
    const user = userEvent.setup()
    const mockOnSearch = vi.fn()
    
    render(
      <SearchBarWrapper onSearch={mockOnSearch} />
    )
    
    const input = screen.getByRole('combobox')
    await user.type(input, 'Bulbizarre')
    
    expect(input).toHaveValue('Bulbizarre')
  })

  it('should reset input when searchValue prop changes', () => {
    const mockOnSearch = vi.fn()
    
    const { rerender } = render(
      <SearchBarWrapper onSearch={mockOnSearch} />
    )
    
    // Re-render avec une nouvelle valeur
    rerender(
      <ThemeProvider theme={createCustomTheme('light')}>
        <LanguageProvider>
          <SearchBar onSearch={mockOnSearch} searchValue="" />
        </LanguageProvider>
      </ThemeProvider>
    )
    
    const input = screen.getByRole('combobox')
    expect(input).toHaveValue('')
  })
})