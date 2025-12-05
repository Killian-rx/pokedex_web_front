import React from "react";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Chip, Box } from '@mui/material';
import LazyImage from './LazyImage.jsx';

const PokemonCard = ({ pokemon }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (pokemon.id) {
      navigate(`/pokemon/${pokemon.id}`);
    }
  };

  return (
    <Card 
      onClick={handleClick}
      sx={{
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        height: '100%',
        minHeight: 280,
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
        },
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <Box sx={{ position: 'relative', height: 160, flex: '0 0 160px' }}>
        <Typography 
          variant="caption" 
          sx={{ 
            position: 'absolute', 
            top: 8, 
            right: 8, 
            bgcolor: 'rgba(0,0,0,0.8)', 
            color: 'white', 
            px: 1, 
            borderRadius: 1,
            fontSize: '0.7rem',
            zIndex: 1,
            fontWeight: 600
          }}
        >
          #{String(pokemon.id).padStart(3, '0')}
        </Typography>
        <Box sx={{ 
          height: '100%',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          p: 1,
          bgcolor: '#f8f9fa'
        }}>
          <LazyImage 
            src={pokemon.image} 
            alt={pokemon.name}
            style={{ 
              width: '90px', 
              height: '90px', 
              objectFit: 'contain'
            }}
          />
        </Box>
      </Box>
      
      <CardContent sx={{ 
        flex: '1 1 auto',
        p: 1.5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 0
      }}>
        <Typography 
          variant="subtitle1" 
          component="h2" 
          sx={{ 
            textAlign: 'center', 
            fontWeight: 600,
            fontSize: '0.9rem',
            lineHeight: 1.2,
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {pokemon.name}
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          gap: 0.5, 
          justifyContent: 'center', 
          flexWrap: 'wrap',
          mt: 'auto'
        }}>
          {pokemon.types ? pokemon.types.map((type, index) => (
            <Chip 
              key={index}
              label={type.name}
              size="small"
              sx={{ 
                backgroundColor: type.backgroundColor,
                color: 'white',
                fontWeight: 500,
                fontSize: '0.65rem',
                height: 18,
                '& .MuiChip-label': { px: 0.5 }
              }}
            />
          )) : (
            <Chip label="Inconnu" size="small" color="default" />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default PokemonCard;