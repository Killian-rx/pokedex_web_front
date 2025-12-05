import React, { useState } from "react";
import { AppBar, Toolbar, Box, Container, IconButton } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useThemeMode } from '../contexts/ThemeModeContext.jsx';
import Logo from "./logo.jsx";
import ChooseLanguage from "./choose_language.jsx";
import SearchBar from "./search_bar.jsx";

const Header = ({ onSearch }) => {
  const { isDarkMode, toggleDarkMode } = useThemeMode();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (searchTerm) => {
    setSearchValue(searchTerm);
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleReset = () => {
    setSearchValue('');
    if (onSearch) {
      onSearch('');
    }
  };

  const handleThemeToggle = (event) => {
    toggleDarkMode();
    // Enlever le focus du bouton après le clic
    event.currentTarget.blur();
  };

  return (
    <AppBar 
      position="fixed" 
      elevation={1}
      sx={{ 
        bgcolor: 'background.paper',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid',
        borderBottomColor: 'divider',
        color: 'text.primary'
      }}
    >
      <Toolbar sx={{ height: 70, minHeight: '70px !important' }}>
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
          <Logo onReset={handleReset} />
          <Box sx={{ flex: 1, maxWidth: 400, mx: 2 }}>
            <SearchBar onSearch={handleSearch} searchValue={searchValue} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton 
              onClick={handleThemeToggle}
              color="inherit"
              sx={{ 
                bgcolor: 'action.hover',
                '&:hover': { bgcolor: 'action.selected' },
                '&:focus': { bgcolor: 'action.hover' }
              }}
            >
              {isDarkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
            <ChooseLanguage />
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default Header;