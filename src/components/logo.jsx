import React from "react";
import { CatchingPokemon } from '@mui/icons-material';
import '../css/logo.css';

const Logo = () => {
    return (
        <div className="logo-container">
            <CatchingPokemon className="logo-icon" />
            <h1 className="logo-text">
                Pokédex
            </h1>
        </div>
    );
}

export default Logo;