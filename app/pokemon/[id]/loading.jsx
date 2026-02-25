import { Box, CircularProgress, Typography, Container } from '@mui/material'

export default function PokemonLoading() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          gap: 3
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          Chargement du Pokémon...
        </Typography>
      </Box>
    </Container>
  )
}

