import React from "react";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import LazyImage from './LazyImage.jsx';
import '../css/pokemon_card.css';

const PokemonCard = ({ pokemon }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (pokemon.id) {
      navigate(`/pokemon/${pokemon.id}`);
    }
  };

  return (
    <Card className="pokemon-card" onClick={handleClick}>
      <Box className="pokemon-card-image-container">
        <Typography className="pokemon-card-id">
          #{String(pokemon.id).padStart(3, '0')}
        </Typography>
        <Box className="pokemon-card-image-box">
          <LazyImage 
            src={pokemon.image} 
            alt={pokemon.name}
            className="pokemon-card-image"
          />
        </Box>
      </Box>
      
      <CardContent className="pokemon-card-content">
        <Typography className="pokemon-card-name">
          {pokemon.name}
        </Typography>
        
        <Box className="pokemon-card-types">
          {pokemon.types ? pokemon.types.map((type, index) => (
            <span 
              key={index}
              className="pokemon-type-chip"
              style={{ backgroundColor: type.backgroundColor }}
            >
              {type.name}
            </span>
          )) : (
            <Chip label="Inconnu" size="small" color="default" />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default PokemonCard;