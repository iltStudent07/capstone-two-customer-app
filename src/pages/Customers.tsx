import { useCustomerContext } from '../context/CustomerContext'
import { useState, useEffect } from 'react'
import CustomerList from '../components/CustomerList'
import useCustomerApi from '../hooks/useCustomerApi'



function Customers() {
    const { fetchCustomers, deleteCustomer } = useCustomerApi()
    const { state } = useCustomerContext()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        fetchCustomers()
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [fetchCustomers])

    if (loading) return <p>Loading Customers</p>

    const handleDelete = async (id: number) => {
        try {
            await deleteCustomer(id)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <h1>Customers:</h1>
            <CustomerList customers={state.customers} onDelete={handleDelete} />
        </div>  
    )
}

export default Customers