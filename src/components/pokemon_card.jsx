'use client'

import React from "react";
import Link from 'next/link';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import LazyImage from './LazyImage.jsx';
import '../css/pokemon_card.css';

const PokemonCard = ({ pokemon, priority = false }) => {
  if (!pokemon.id) {
    return null;
  }

  return (
    <Link href={`/pokemon/${pokemon.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card className="pokemon-card" sx={{ cursor: 'pointer' }}>
      <Box className="pokemon-card-image-container">
        <Typography className="pokemon-card-id">
          #{String(pokemon.id).padStart(3, '0')}
        </Typography>
        <Box className="pokemon-card-image-box">
          <LazyImage 
            src={pokemon.image} 
            alt={pokemon.name}
            className="pokemon-card-image"
            priority={priority}
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
    </Link>
  );
}

export default PokemonCard;