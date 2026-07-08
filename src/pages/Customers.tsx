import { useEffect, useState } from 'react'
import CustomerList from '../components/CustomerList'
import { useCustomerContext } from '../context/CustomerContext'


function Customers() {
    const { state, dispatch } = useCustomerContext()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        fetch('/api/customers')
            .then(res => {
                if(!res.ok) throw new Error('No users found')
                return res.json()
            })
            .then((data) => {
                dispatch({ type: 'SET_CUSTOMERS', payload: data })
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [dispatch])

    //Deletes customer data with matching id to the delete button that is clicked by the user
    const handleDelete = async (id: number) => {
        const response = await fetch(`/api/customers/${id}`, { method: 'DELETE' })
        if (!response.ok) throw new Error('There was an error deleting the customer')
        dispatch({ type: 'DELETE_CUSTOMER', payload: id })
    }

    if (loading) return <div>Loading...</div>
    

    return (
        <div>
           <h1>Customers:</h1>
            <CustomerList customers = {state.customers} onDelete = {handleDelete} /> 
        </div>  
    )
}

export default Customers