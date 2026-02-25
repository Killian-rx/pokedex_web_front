'use client'

import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ListePokemon from '../src/components/pokemon_list.jsx'

function HomePageContent() {
  const searchParams = useSearchParams()
  const searchTerm = searchParams.get('search') || ''

  return (
    <div>
      <ListePokemon searchTerm={searchTerm} />
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <HomePageContent />
    </Suspense>
  )
}

