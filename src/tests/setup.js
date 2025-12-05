import '@testing-library/jest-dom'
import { vi } from 'vitest'
import React from 'react'

// Mock LazyImage pour éviter les problèmes d'IntersectionObserver
vi.mock('../components/LazyImage.jsx', () => ({
  default: ({ src, alt, className }) => React.createElement('img', { src, alt, className })
}))

// Mock IntersectionObserver au cas où
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() { return null; }
  disconnect() { return null; }
  unobserve() { return null; }
}
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Nettoie après chaque test
afterEach(() => {
  cleanup()
})