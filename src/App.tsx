import { Route, Routes } from 'react-router-dom'
import Customers from './pages/Customers'
import Add from './pages/Add'
import Edit from './pages/Edit'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'

function App() {

  return (
    <>
      <ErrorBoundary>
        <Layout>
          <Routes>
            <Route path='/' element={<Customers />} />
            <Route path='/add' element={<Add />} />
            <Route path='/edit/:id' element={<Edit />} />
          </Routes>
        </Layout>
      </ErrorBoundary>  
    </>
  )
}

export default App