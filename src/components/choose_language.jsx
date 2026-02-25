'use client'

import React, { useState } from "react";
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import { Language, KeyboardArrowDown } from '@mui/icons-material';
import { useLanguage } from "../contexts/LanguageContext";

const ChooseLanguage = () => {
    const { currentLanguage, availableLanguages, changeLanguage } = useLanguage();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const getCurrentLanguage = () => {
        return availableLanguages.find(lang => lang.code === currentLanguage);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageChange = (languageCode) => {
        changeLanguage(languageCode);
        handleClose();
    };

    return (
        <>
            <Button
                variant="outlined"
                startIcon={<Language />}
                endIcon={<KeyboardArrowDown />}
                onClick={handleClick}
                sx={{
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                        bgcolor: 'action.hover',
                        borderColor: 'primary.main',
                    },
                    textTransform: 'none',
                    minWidth: 120
                }}
            >
                {getCurrentLanguage()?.flag} {getCurrentLanguage()?.name}
            </Button>
            
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    sx: {
                        bgcolor: 'background.paper',
                        border: '1px solid',
                        borderColor: 'divider',
                        boxShadow: 3
                    }
                }}
            >
                {availableLanguages.map((language) => (
                    <MenuItem
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        selected={currentLanguage === language.code}
                        sx={{ minWidth: 120 }}
                    >
                        <Typography>
                            {language.flag} {language.name}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

export default ChooseLanguage;