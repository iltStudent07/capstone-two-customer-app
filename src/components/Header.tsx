import Navbar from './Navbar'
import { useTheme } from '../context/ThemeContext'
import { useEffect } from 'react'

function Header() {
    const { theme, toggleTheme } = useTheme()

    useEffect(() => {
        document.documentElement.classList.remove('App', 'DarkTheme')
        document.documentElement.classList.add(theme === 'light' ? 'App' : 'DarkTheme')
    }, [theme])

    return (
        <div className="headerContainer">
            <h2 className="navbarHeading">Customer Manager</h2>
            <button onClick={ toggleTheme }>{theme === 'light' ? 'Dark 🌙' : 'Light ☀️'} </button>
            <Navbar />
        </div>  
    )
}

export default Header