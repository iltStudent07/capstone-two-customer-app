import { createContext, useContext, type ReactNode } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
    theme: Theme
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode} ) {
    const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light')

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme(): ThemeContextValue {
    const theme = useContext(ThemeContext)
    if(!theme) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return theme
}