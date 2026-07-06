import { NavLink } from 'react-router-dom'

function Navbar() {
    const linkStyle = ({ isActive }: { isActive: boolean }) => ({
        color: isActive ? '#2574A9' : '#333',
        fontweight: isActive ? 'bold' as const : 'normal' as const,
        textDecoration: 'none',
        padding: '8px 16px',
    });

    return (
        <nav style={{
            display: 'flex',
            gap: '8px'
        }}>
            <button><NavLink to="/" style={linkStyle}>Customers</NavLink></button>
            <button><NavLink to="/add" style={linkStyle}>Add</NavLink></button>
        </nav>
    )
}

export default Navbar