import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Container, 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Box, 
  Grid, 
  LinearProgress, 
  IconButton,
  CircularProgress
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useLanguage } from "../contexts/LanguageContext";
import pokemonData from "../data/pokemon.json";
import typesData from "../data/types.json";
import LazyImage from "../components/LazyImage.jsx";

const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const foundPokemon = pokemonData.find(p => p.id === parseInt(id));
    setPokemon(foundPokemon);
  }, [id]);

  if (!pokemon) {
    return (
      <Container maxWidth="md" sx={{ py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Chargement du Pokémon...
          </Typography>
        </Box>
      </Container>
    );
  }

  const getTypeInfo = (typeName) => {
    const typeInfo = typesData[typeName];
    return {
      name: typeInfo?.translations?.[currentLanguage] || typeInfo?.translations?.en || typeName,
      backgroundColor: typeInfo?.backgroundColor || "#68A090"
    };
  };

  const getPokemonName = () => {
    if (pokemon.names) {
      return pokemon.names[currentLanguage] || pokemon.names.en || `Pokémon #${pokemon.id}`;
    }
    return `Pokémon #${pokemon.id}`;
  };

  const mainType = pokemon.types?.[0];
  const typeInfo = typesData[mainType];
  const primaryColor = typeInfo?.backgroundColor || "#68A090";

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <IconButton 
        onClick={() => navigate(-1)}
        sx={{ 
          mb: 2,
          bgcolor: 'background.paper',
          boxShadow: 1,
          '&:hover': { bgcolor: 'grey.100' }
        }}
      >
        <ArrowBack />
      </IconButton>
      
      <Card sx={{ overflow: 'hidden' }}>
        <Box sx={{ 
          background: `linear-gradient(135deg, ${primaryColor}20 0%, ${primaryColor}10 100%)`,
          p: 3
        }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                  #{String(pokemon.id).padStart(3, '0')}
                </Typography>
                <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: 700 }}>
                  {getPokemonName()}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' }, flexWrap: 'wrap' }}>
                  {pokemon.types?.map((type, index) => {
                    const typeData = getTypeInfo(type);
                    return (
                      <Chip
                        key={index}
                        label={typeData.name}
                        sx={{ 
                          backgroundColor: typeData.backgroundColor,
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '0.9rem',
                          px: 1
                        }}
                      />
                    );
                  })}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <LazyImage 
                  src={pokemon.image} 
                  alt={getPokemonName()}
                  style={{ maxWidth: 200, height: 'auto' }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Statistiques
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Taille
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {pokemon.height / 10} m
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Poids
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {pokemon.weight / 10} kg
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Capacités
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {pokemon.moves?.slice(0, 12).map((move, index) => (
                  <Chip
                    key={index}
                    label={move.replace('-', ' ')}
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 2 }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

export default DetailsPage;