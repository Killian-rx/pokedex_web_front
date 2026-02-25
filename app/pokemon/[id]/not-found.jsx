import { Container, Box, Typography, Button } from '@mui/material'
import { Home, ArrowBack } from '@mui/icons-material'
import Link from 'next/link'

export default function PokemonNotFound() {
  return (
    <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h1" component="h1" sx={{ fontSize: { xs: '4rem', md: '6rem' }, fontWeight: 700, mb: 2 }}>
          🎴
        </Typography>
        <Typography variant="h4" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
          Pokémon introuvable
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Le Pokémon que vous recherchez n&apos;existe pas dans le Pokédex.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button
          component={Link}
          href="/"
          variant="contained"
          startIcon={<Home />}
          size="large"
          sx={{ borderRadius: 2 }}
        >
          Retour à l&apos;accueil
        </Button>
        <Button
          component={Link}
          href="/"
          variant="outlined"
          startIcon={<ArrowBack />}
          size="large"
          sx={{ borderRadius: 2 }}
        >
          Voir tous les Pokémon
        </Button>
      </Box>
    </Container>
  )
}

