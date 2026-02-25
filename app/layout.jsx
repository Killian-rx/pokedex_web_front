import Providers from './providers.jsx'
import '../src/index.css'

export const metadata = {
  title: 'Pokédex Web Frontend',
  description: 'Une application web moderne pour explorer l\'univers des Pokémon',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

