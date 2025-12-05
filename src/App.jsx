import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, Box } from '@mui/material'
import theme from './theme/theme.js'
import HomePage from './pages/HomePage.jsx'
import DetailsPage from './pages/DetailsPage.jsx'
import Header from './components/header.jsx'
import { LanguageProvider } from './contexts/LanguageContext.jsx'

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

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
  )
}

export default App
