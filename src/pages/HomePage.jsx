import React from "react";
import PokemonCard from "../components/pokemon_card.jsx";
import ListePokemon from "../components/pokemon_list.jsx";

const HomePage = ({ searchTerm }) => {
  return (
    <div>
      <ListePokemon searchTerm={searchTerm} />
    </div>
  );
}

export default HomePage;