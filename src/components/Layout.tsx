import Header from './Header'
import type { ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode
}

 function Layout({children}: LayoutProps) {
    return (
        <div>
            <Header />
            <main>{children}</main>   
        </div>
    )
}

export default Layout