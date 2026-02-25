import { Box, CircularProgress, Typography, Container } from '@mui/material'

export default function Loading() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
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
          Chargement...
        </Typography>
      </Box>
    </Container>
  )
}

