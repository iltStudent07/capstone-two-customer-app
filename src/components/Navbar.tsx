import { NavLink } from 'react-router-dom'

function Navbar() {
    const linkStyle = ({ isActive }: { isActive: boolean }) => ({
        color: isActive ? 'white' : '#333',
        fontSize: '18px',
        background: isActive ? 'darkblue' : 'lightgrey',
        fontweight: isActive ? 'bold' as const : 'normal' as const,
        textDecoration: 'none',
        padding: '10px 8px',
        borderRadius: '5px',
    });

    return (
        <nav style={{
            display: 'flex',
            gap: '8px'
        }}>
            <NavLink to="/" style={linkStyle}>Customers</NavLink>
            <NavLink to="/add" style={linkStyle}>Add Customer</NavLink>
        </nav>
    )
}

export default Navbar