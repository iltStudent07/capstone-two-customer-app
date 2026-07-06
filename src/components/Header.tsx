import Navbar from './Navbar'

function Header() {
    return (
        <div style={{ 
            display: "flex",
            justifyContent: 'space-between',
            gap: '8px',
            padding: '16px',
            backgroundColor: '#f4f6f9',
            borderBottom: '2px solid #ddd'
            }}>
            <h2>Customer Manager</h2>
            <Navbar />
        </div>  
    )
}

export default Header