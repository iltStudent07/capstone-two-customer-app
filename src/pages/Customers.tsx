import { useCustomerContext } from '../context/CustomerContext'
import { useState, useEffect } from 'react'
import CustomerList from '../components/CustomerList'
import useCustomerApi from '../hooks/useCustomerApi'



function Customers() {
    const { fetchCustomers, deleteCustomer } = useCustomerApi()
    const { state, dispatch } = useCustomerContext()
    const [loading, isLoading] = useState<boolean>(true)

    

    useEffect(() => {
        fetchCustomers().catch((error) => {
            console.error(error)
            isLoading(false)
        })
    }, [dispatch])

    if(loading) <p>Loading Customers</p>
    //Deletes customer data with matching id to the delete button that is clicked by the user
    const handleDelete = async (id: number) => {
        deleteCustomer(id)
    }

    
    

    return (
        <div>
           <h1>Customers:</h1>
            <CustomerList customers = {state.customers} onDelete = {handleDelete} /> 
        </div>  
    )
}

export default Customers