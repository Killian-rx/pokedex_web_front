import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, Box } from '@mui/material'
import createCustomTheme from './theme/theme.js'
import { ThemeModeProvider, useThemeMode } from './contexts/ThemeModeContext.jsx'
import HomePage from './pages/HomePage.jsx'
import DetailsPage from './pages/DetailsPage.jsx'
import Header from './components/header.jsx'
import { LanguageProvider } from './contexts/LanguageContext.jsx'

function AppContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const { isDarkMode } = useThemeMode();
  const theme = createCustomTheme(isDarkMode ? 'dark' : 'light');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Ajouter la classe dark-mode au body
  React.useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LanguageProvider>
        <Router>
          <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <Header onSearch={handleSearch} />
            <Box component="main" sx={{ pt: 10 }}>
              <Routes>
                <Route path="/" element={<HomePage searchTerm={searchTerm} />} />
                <Route path="/pokemon/:id" element={<DetailsPage />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

function App() {
  return (
    <ThemeModeProvider>
      <AppContent />
    </ThemeModeProvider>
  );
}

export default App;
