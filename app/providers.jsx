'use client'

import React, { Suspense } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, Box } from '@mui/material'
import createCustomTheme from '../src/theme/theme.js'
import { ThemeModeProvider, useThemeMode } from '../src/contexts/ThemeModeContext.jsx'
import { LanguageProvider } from '../src/contexts/LanguageContext.jsx'
import Header from '../src/components/header.jsx'

function HeaderWrapper() {
  return (
    <Suspense fallback={<Box sx={{ height: 70 }} />}>
      <Header />
    </Suspense>
  )
}

function AppContent({ children }) {
  const { isDarkMode } = useThemeMode()
  const theme = createCustomTheme(isDarkMode ? 'dark' : 'light')

  // Ajouter la classe dark-mode au body
  React.useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [isDarkMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <HeaderWrapper />
        <Box component="main" sx={{ pt: 10 }}>
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default function Providers({ children }) {
  return (
    <ThemeModeProvider>
      <LanguageProvider>
        <AppContent>
          {children}
        </AppContent>
      </LanguageProvider>
    </ThemeModeProvider>
  )
}

