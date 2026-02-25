'use client'

import React from "react";
import { useRouter } from 'next/navigation';
import { CatchingPokemon } from '@mui/icons-material';
import '../css/logo.css';

const Logo = ({ onReset }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push('/');
        if (onReset) {
            onReset();
        }
    };

    return (
        <div className="logo-container" onClick={handleClick}>
            <CatchingPokemon className="logo-icon" />
            <h1 className="logo-text">
                Pokédex
            </h1>
        </div>
    );
}

export default Logo;