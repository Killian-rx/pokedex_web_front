import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import createCustomTheme from '../theme/theme.js'
import Logo from '../components/logo.jsx'

// Wrapper pour fournir les contextes nécessaires
const LogoWrapper = ({ children }) => {
  const theme = createCustomTheme('light')
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </BrowserRouter>
  )
}

describe('Logo Component', () => {
  it('should render logo with correct text', () => {
    render(
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
    )
    
    expect(screen.getByText('Pokédex')).toBeInTheDocument()
  })

  it('should have correct CSS classes', () => {
    render(
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
    )
    
    const logoContainer = screen.getByText('Pokédex').closest('div')
    expect(logoContainer).toHaveClass('logo-container')
  })

  it('should be clickable', () => {
    render(
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
    )
    
    const logoContainer = screen.getByText('Pokédex').closest('div')
    // Vérifier que l'élément a la classe CSS appropriée au lieu du style inline
    expect(logoContainer).toHaveClass('logo-container')
    
    // Test de clic
    fireEvent.click(logoContainer)
  })
})