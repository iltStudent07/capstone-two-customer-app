import { Route, Routes } from 'react-router-dom'
import Customers from './pages/Customers'
import Add from './pages/Add'
import Edit from './pages/Edit'
import Layout from './components/Layout'
import './App.css'

function App() {

  return (
    <>
      <Layout>
        <Routes>
          <Route path='/' element={<Customers />} />
          <Route path='/add' element={<Add />} />
          <Route path='/edit/:1' element={<Edit />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App