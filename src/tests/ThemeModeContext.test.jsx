import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { ThemeModeProvider, useThemeMode } from '../contexts/ThemeModeContext.jsx'

// Mock localStorage
const localStorageMock = (() => {
  let store = {}
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString()
    }),
    removeItem: vi.fn((key) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    })
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

describe('ThemeModeContext', () => {
  beforeEach(() => {
    localStorageMock.clear()
    vi.clearAllMocks()
  })

  it('should provide default light mode when no stored preference', () => {
    const { result } = renderHook(() => useThemeMode(), {
      wrapper: ThemeModeProvider
    })

    expect(result.current.isDarkMode).toBe(false)
  })

  it('should toggle dark mode', () => {
    const { result } = renderHook(() => useThemeMode(), {
      wrapper: ThemeModeProvider
    })

    act(() => {
      result.current.toggleDarkMode()
    })

    expect(result.current.isDarkMode).toBe(true)
    expect(localStorageMock.setItem).toHaveBeenCalledWith('darkMode', 'true')
  })

  it('should toggle back to light mode', () => {
    const { result } = renderHook(() => useThemeMode(), {
      wrapper: ThemeModeProvider
    })

    // First toggle to dark
    act(() => {
      result.current.toggleDarkMode()
    })

    // Then toggle back to light
    act(() => {
      result.current.toggleDarkMode()
    })

    expect(result.current.isDarkMode).toBe(false)
    expect(localStorageMock.setItem).toHaveBeenLastCalledWith('darkMode', 'false')
  })

  it('should restore saved preference from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('true')

    const { result } = renderHook(() => useThemeMode(), {
      wrapper: ThemeModeProvider
    })

    expect(result.current.isDarkMode).toBe(true)
  })

  it('should throw error when used outside provider', () => {
    expect(() => {
      renderHook(() => useThemeMode())
    }).toThrow('useThemeMode must be used within a ThemeModeProvider')
  })
})