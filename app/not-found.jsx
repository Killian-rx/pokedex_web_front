'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Container, Box, Typography, Button } from '@mui/material'
import { Home, ArrowBack } from '@mui/icons-material'

export default function NotFound() {
  const router = useRouter()

  return (
    <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h1" component="h1" sx={{ fontSize: { xs: '4rem', md: '6rem' }, fontWeight: 700, mb: 2 }}>
          404
        </Typography>
        <Typography variant="h4" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
          Pokémon introuvable
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Le Pokémon que vous recherchez n'existe pas ou a été déplacé.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          startIcon={<Home />}
          onClick={() => router.push('/')}
          size="large"
          sx={{ borderRadius: 2 }}
        >
          Retour à l'accueil
        </Button>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => router.back()}
          size="large"
          sx={{ borderRadius: 2 }}
        >
          Page précédente
        </Button>
      </Box>
    </Container>
  )
}

