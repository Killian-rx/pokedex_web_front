import React, { useState } from "react";
import { AppBar, Toolbar, Box, Container } from '@mui/material';
import Logo from "./logo.jsx";
import ChooseLanguage from "./choose_language.jsx";
import SearchBar from "./search_bar.jsx";

const Header = ({ onSearch }) => {
  const handleSearch = (searchTerm) => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <AppBar 
      position="fixed" 
      elevation={1}
      sx={{ 
        bgcolor: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(224, 224, 224, 0.3)',
        color: 'text.primary'
      }}
    >
      <Toolbar sx={{ height: 70, minHeight: '70px !important' }}>
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
          <Logo />
          <Box sx={{ flex: 1, maxWidth: 400, mx: 2 }}>
            <SearchBar onSearch={handleSearch} />
          </Box>
          <ChooseLanguage />
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default Header;