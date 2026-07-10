import { Route, Routes } from 'react-router-dom'
import Customers from './pages/Customers'
import Add from './pages/Add'
import Edit from './pages/Edit'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import { ThemeProvider} from './context/ThemeContext'
import './App.css'
import './DarkTheme.css'

function App() {

  return (
    <>
      <ThemeProvider>
        <ErrorBoundary>
          <Layout>
            <Routes>
              <Route path='/' element={<Customers />} />
              <Route path='/add' element={<Add />} />
              <Route path='/edit/:id' element={<Edit />} />
            </Routes>
          </Layout>
        </ErrorBoundary>
      </ThemeProvider>   
    </>
  )
}

export default App