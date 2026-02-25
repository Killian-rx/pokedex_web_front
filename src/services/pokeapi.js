const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Récupère un Pokémon par son ID
 */
export async function getPokemonById(id) {
  try {
    const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${id}`);
    if (!response.ok) {
      throw new Error(`Pokemon ${id} not found`);
    }
    const data = await response.json();
    return transformPokemonData(data);
  } catch (error) {
    console.error(`Error fetching pokemon ${id}:`, error);
    throw error;
  }
}

/**
 * Récupère les informations d'espèce d'un Pokémon (pour les noms traduits)
 */
export async function getPokemonSpecies(id) {
  try {
    const response = await fetch(`${POKEAPI_BASE_URL}/pokemon-species/${id}`);
    if (!response.ok) {
      throw new Error(`Pokemon species ${id} not found`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching pokemon species ${id}:`, error);
    throw error;
  }
}

/**
 * Récupère une liste de Pokémon (limite par défaut: 151 pour la première génération)
 */
export async function getPokemonList(limit = 151, offset = 0) {
  try {
    const response = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    if (!response.ok) {
      throw new Error('Failed to fetch pokemon list');
    }
    const data = await response.json();
    
    // Récupérer les détails de chaque Pokémon en utilisant l'URL ou l'ID extrait de l'URL
    const pokemonPromises = data.results.map((pokemon) => {
      // Extraire l'ID de l'URL (format: https://pokeapi.co/api/v2/pokemon/1/)
      const urlParts = pokemon.url.split('/');
      const id = parseInt(urlParts[urlParts.length - 2]);
      return getPokemonById(id).catch(() => null);
    });
    
    const pokemonList = await Promise.all(pokemonPromises);
    return pokemonList.filter(p => p !== null);
  } catch (error) {
    console.error('Error fetching pokemon list:', error);
    throw error;
  }
}

/**
 * Transforme les données de PokeAPI en format compatible avec l'application
 */
function transformPokemonData(apiData) {
  return {
    id: apiData.id,
    name: apiData.name,
    height: apiData.height,
    weight: apiData.weight,
    image: apiData.sprites.other['official-artwork'].front_default || 
           apiData.sprites.front_default || 
           `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${apiData.id}.png`,
    types: apiData.types.map(type => type.type.name),
    moves: apiData.moves.slice(0, 12).map(move => move.move.name),
    stats: apiData.stats.map(stat => ({
      name: stat.stat.name,
      value: stat.base_stat
    }))
  };
}

/**
 * Récupère le nom traduit d'un Pokémon
 */
export async function getPokemonTranslatedName(id, language = 'en') {
  try {
    const species = await getPokemonSpecies(id);
    const nameEntry = species.names.find(n => n.language.name === language);
    return nameEntry ? nameEntry.name : species.name;
  } catch (error) {
    console.error(`Error fetching translated name for pokemon ${id}:`, error);
    return null;
  }
}

/**
 * Récupère un Pokémon avec ses noms traduits
 */
export async function getPokemonWithTranslations(id) {
  try {
    const [pokemon, species] = await Promise.all([
      getPokemonById(id),
      getPokemonSpecies(id)
    ]);
    
    // Extraire les noms dans différentes langues
    const names = {};
    species.names.forEach(nameEntry => {
      const lang = nameEntry.language.name;
      names[lang] = nameEntry.name;
    });
    
    return {
      ...pokemon,
      names
    };
  } catch (error) {
    console.error(`Error fetching pokemon with translations ${id}:`, error);
    throw error;
  }
}

/**
 * Récupère une liste de Pokémon avec leurs noms traduits
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- language param reserved for future use
export async function getPokemonListWithTranslations(limit = 151, offset = 0, language = 'en') {
  try {
    const list = await getPokemonList(limit, offset);
    
    // Récupérer les espèces pour les traductions (en parallèle)
    const speciesPromises = list.map(pokemon => 
      getPokemonSpecies(pokemon.id).catch(() => null)
    );
    const speciesList = await Promise.all(speciesPromises);
    
    // Combiner les données
    return list.map((pokemon, index) => {
      const species = speciesList[index];
      if (species) {
        const names = {};
        species.names.forEach(nameEntry => {
          const lang = nameEntry.language.name;
          names[lang] = nameEntry.name;
        });
        return {
          ...pokemon,
          names
        };
      }
      return pokemon;
    });
  } catch (error) {
    console.error('Error fetching pokemon list with translations:', error);
    throw error;
  }
}

