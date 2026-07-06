import Header from './Header'

function Layout({children}) {
    return (
        <div>
            <Header />
            <main style={{ padding: '24px' }}>{children}</main>   
        </div>
    )
}

export default Layout