import React from "react";
import { Grid, Typography, Container, Box, Alert, CircularProgress } from '@mui/material';
import PokemonCard from "./pokemon_card.jsx";
import pokemonData from "../data/pokemon.json";
import typesData from "../data/types.json";
import { useLanguage } from "../contexts/LanguageContext";


const ListePokemon = ({ searchTerm }) => {
    const { currentLanguage } = useLanguage();

    // Fonction pour obtenir les informations du type depuis types.json
    const getTypeInfo = (typeName) => {
        const typeInfo = typesData[typeName];
        return {
            name: typeInfo?.translations?.[currentLanguage] || typeInfo?.translations?.en || typeName,
            backgroundColor: typeInfo?.backgroundColor || "#68A090"
        };
    };

    // Fonction pour obtenir le nom du Pokémon dans la langue sélectionnée
    const getPokemonName = (pokemon) => {
        if (pokemon.names) {
            return pokemon.names[currentLanguage] || pokemon.names.en || `Pokémon #${pokemon.id}`;
        }
        return `Pokémon #${pokemon.id}`;
    };

    // Fonction pour filtrer les Pokémon selon le terme de recherche
    const filteredPokemon = pokemonData.filter((pokemon) => {
        if (!searchTerm) return true;
        
        const pokemonName = getPokemonName(pokemon).toLowerCase();
        const search = searchTerm.toLowerCase();
        
        // Recherche par nom
        if (pokemonName.includes(search)) return true;
        
        // Recherche par ID
        if (pokemon.id.toString().includes(search)) return true;
        
        // Recherche par type
        const typesInCurrentLang = pokemon.types.map(type => 
            getTypeInfo(type).name.toLowerCase()
        );
        if (typesInCurrentLang.some(type => type.includes(search))) return true;
        
        return false;
    });

    return (
        <Container maxWidth="lg" sx={{ py: 3 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 3, textAlign: 'center', fontWeight: 600 }}>
                {searchTerm ? 
                    `Résultats pour "${searchTerm}" (${filteredPokemon.length})` : 
                    `Pokédex (${filteredPokemon.length} Pokémon)`
                }
            </Typography>
            
            {filteredPokemon.length === 0 && searchTerm ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <Alert severity="info" sx={{ maxWidth: 400 }}>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            Aucun Pokémon trouvé pour "{searchTerm}"
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Essayez de rechercher par nom, numéro ou type.
                        </Typography>
                    </Alert>
                </Box>
            ) : (
                <Box sx={{ 
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                        lg: 'repeat(5, 1fr)',
                        xl: 'repeat(5, 1fr)'
                    },
                    gap: 2,
                    alignItems: 'stretch'
                }}>
                    {filteredPokemon.slice(0, 50).map((pokemon) => (
                        <Box key={pokemon.id}>
                            <PokemonCard 
                                pokemon={{
                                    id: pokemon.id,
                                    name: getPokemonName(pokemon),
                                    image: pokemon.image,
                                    types: pokemon.types.map(type => getTypeInfo(type))
                                }} 
                            />
                        </Box>
                    ))}
                </Box>
            )}
        </Container>
    );
}

export default ListePokemon;