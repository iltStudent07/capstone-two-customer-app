import { useCustomerContext } from '../context/CustomerContext'
import { type CustomerFormData, type Customer} from '../types/customer'
import { useParams } from 'react-router-dom'
import { useCallback } from 'react'


function useCustomerApi() {
    const { dispatch } = useCustomerContext()
    const { id } = useParams<{ id: string }>()
    
    //API call to GET customer info from the server
    const fetchCustomers = useCallback(async function fetchCustomers() {
        const response = await fetch('/api/customers')
        if (!response.ok) throw new Error('There was an error fetching customers')
        const data: Customer[] = await response.json()
        dispatch({ type: 'SET_CUSTOMERS', payload: data })
    }, [dispatch])


    //API call to POST customer info to server
    const addCustomer = useCallback(async function addCustomer(data: CustomerFormData): Promise<void> {
        const response = await fetch('/api/customers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        if (!response.ok) throw new Error('There was an error adding the customer')
        const createdCustomer = await response.json()
        dispatch({ type: 'ADD_CUSTOMER', payload: createdCustomer })
    }, [dispatch])

    //API call to PUT changes to customer info in server
    const updateCustomer = useCallback(async function updateCustomer(data: CustomerFormData) {
        const response = await fetch(`/api/customers/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        if (!response.ok) throw new Error('There was an error editing the customer')
        const updatedCustomer = await response.json()
        dispatch({ type: 'UPDATE_CUSTOMER', payload: updatedCustomer })
    }, [dispatch, id])

    //API call to DELETE customer info in server
    const deleteCustomer = useCallback(async function deleteCustomer(id: number) {
        const response = await fetch(`/api/customers/${id}`, { method: 'DELETE' })
        if (!response.ok) throw new Error('There was an error deleting the customer')
        dispatch({ type: 'DELETE_CUSTOMER', payload: id })
    }, [dispatch])

    return { fetchCustomers, addCustomer, updateCustomer, deleteCustomer }
}

export default useCustomerApi