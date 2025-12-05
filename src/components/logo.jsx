import React from "react";
import { Box, Typography } from '@mui/material';
import { CatchingPokemon } from '@mui/icons-material';

const Logo = () => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CatchingPokemon 
                sx={{ 
                    fontSize: 32, 
                    color: 'primary.main',
                    animation: 'spin 3s linear infinite'
                }} 
            />
            <Typography 
                variant="h5" 
                component="div" 
                sx={{ 
                    fontWeight: 700, 
                    color: 'primary.main',
                    '@keyframes spin': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' }
                    }
                }}
            >
                Pokédex
            </Typography>
        </Box>
    );
}

export default Logo;