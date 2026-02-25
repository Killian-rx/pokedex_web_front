'use client'

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Autocomplete, TextField, InputAdornment, Paper, Box, Typography, Chip } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useLanguage } from "../contexts/LanguageContext";
import typesData from "../data/types.json";
import { getPokemonListWithTranslations } from "../services/pokeapi.js";

const SearchBar = ({ onSearch, searchValue = "" }) => {
    const [inputValue, setInputValue] = useState(searchValue);
    const [pokemonData, setPokemonData] = useState([]);
    const { currentLanguage } = useLanguage();

    // Charger les données des Pokémon pour l'autocomplétion
    useEffect(() => {
        const loadPokemon = async () => {
            try {
                const languageMap = {
                    'fr': 'fr',
                    'en': 'en',
                    'ja': 'ja',
                    'ko': 'ko',
                    'de': 'de',
                    'es': 'es',
                    'it': 'it'
                };
                const apiLanguage = languageMap[currentLanguage] || 'en';
                const data = await getPokemonListWithTranslations(151, 0, apiLanguage);
                setPokemonData(data);
            } catch (err) {
                console.error('Error loading pokemon for search:', err);
            }
        };

        loadPokemon();
    }, [currentLanguage]);

    // Synchroniser inputValue avec searchValue venant du parent
    React.useEffect(() => {
        setInputValue(searchValue);
    }, [searchValue]);

    // Fonction pour obtenir le nom du Pokémon dans la langue sélectionnée
    const getPokemonName = useCallback((pokemon) => {
        if (pokemon.names) {
            return pokemon.names[currentLanguage] || pokemon.names.en || `Pokémon #${pokemon.id}`;
        }
        return `Pokémon #${pokemon.id}`;
    }, [currentLanguage]);

    // Fonction pour obtenir les informations du type
    const getTypeInfo = useCallback((typeName) => {
        const typeInfo = typesData[typeName];
        return {
            name: typeInfo?.translations?.[currentLanguage] || typeInfo?.translations?.en || typeName,
            backgroundColor: typeInfo?.backgroundColor || "#68A090"
        };
    }, [currentLanguage]);

    // Créer les options de recherche
    const searchOptions = useMemo(() => {
        const options = [];
        
        // Ajouter tous les Pokémon
        pokemonData.forEach(pokemon => {
            const name = getPokemonName(pokemon);
            options.push({
                id: pokemon.id,
                label: name,
                type: 'pokemon',
                pokemon: pokemon,
                searchText: `${name} ${pokemon.id}`.toLowerCase()
            });
        });

        // Ajouter tous les types
        Object.keys(typesData).forEach(typeKey => {
            const typeInfo = getTypeInfo(typeKey);
            options.push({
                id: `type-${typeKey}`,
                label: typeInfo.name,
                type: 'type',
                typeKey: typeKey,
                searchText: typeInfo.name.toLowerCase(),
                backgroundColor: typeInfo.backgroundColor
            });
        });

        return options;
    }, [pokemonData, getPokemonName, getTypeInfo]);

    const handleInputChange = (event, newInputValue) => {
        setInputValue(newInputValue);
        // Ne pas faire de recherche automatique, juste mettre à jour l'input
    };

    const handleChange = (event, newValue) => {
        if (newValue) {
            if (newValue.type === 'pokemon') {
                setInputValue(newValue.label);
                if (onSearch) {
                    onSearch(newValue.label);
                }
            } else if (newValue.type === 'type') {
                setInputValue(newValue.label);
                if (onSearch) {
                    onSearch(newValue.label);
                }
            }
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (onSearch) {
                onSearch(inputValue.trim());
            }
        }
    };

    const filterOptions = (options, { inputValue }) => {
        const searchTerm = inputValue.toLowerCase();
        if (!searchTerm) return options.slice(0, 20);
        
        return options
            .filter(option => option.searchText.includes(searchTerm))
            .slice(0, 20);
    };

    const renderOption = (props, option) => {
        const { key, ...otherProps } = props;
        return (
            <Box component="li" key={key} {...otherProps} sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1 }}>
            {option.type === 'pokemon' ? (
                <>
                    <Box 
                        component="img" 
                        src={option.pokemon.image} 
                        alt={option.label}
                        sx={{ width: 32, height: 32, objectFit: 'contain' }}
                    />
                    <Box>
                        <Typography variant="body2">{option.label}</Typography>
                        <Typography variant="caption" color="text.secondary">
                            #{String(option.pokemon.id).padStart(3, '0')}
                        </Typography>
                    </Box>
                </>
            ) : (
                <>
                    <Chip 
                        label={option.label}
                        size="small"
                        sx={{
                            backgroundColor: option.backgroundColor,
                            color: 'white',
                            fontWeight: 500
                        }}
                    />
                    <Typography variant="caption" color="text.secondary">
                        Type
                    </Typography>
                </>
            )}
            </Box>
        );
    };

    return (
        <Autocomplete
            freeSolo
            options={searchOptions}
            filterOptions={filterOptions}
            getOptionLabel={(option) => typeof option === 'string' ? option : option.label}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            onChange={handleChange}
            renderOption={renderOption}
            PaperComponent={({ children, ...other }) => (
                <Paper {...other} sx={{ mt: 1 }}>
                    {children}
                </Paper>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Rechercher un Pokémon ou un type"
                    onKeyPress={handleKeyPress}
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search color="action" />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            bgcolor: 'background.paper',
                            borderRadius: 2,
                            '&:hover fieldset': {
                                borderColor: 'primary.main',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'primary.main',
                            },
                        },
                    }}
                />
            )}
        />
    );
}

export default SearchBar;