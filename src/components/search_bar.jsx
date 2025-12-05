import React, { useState } from "react";
import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        // Recherche en temps réel
        if (onSearch) {
            onSearch(value.trim());
        }
    };

    return (
        <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Rechercher un Pokémon..."
            value={searchTerm}
            onChange={handleInputChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Search color="action" />
                    </InputAdornment>
                ),
            }}
            sx={{
                '& .MuiOutlinedInput-root': {
                    bgcolor: 'white',
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
    );
}

export default SearchBar;