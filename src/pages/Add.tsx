import CustomerForm from '../components/CustomerForm'
import { useCustomerContext } from '../context/CustomerContext'
import { type CustomerFormData } from '../types/customer'
import { useNavigate } from 'react-router-dom'

function Add() {
    const { dispatch } = useCustomerContext()
    const navigate = useNavigate()

    async function handleAddSubmit(data: CustomerFormData) {
        const response = await fetch('/api/customers', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        if (!response.ok) throw new Error('There was an error adding the customer')
        const createdCustomer = await response.json()
        dispatch({type: 'ADD_CUSTOMER', payload: createdCustomer})
        navigate('/')
    }

    return (
        <div>
            <CustomerForm mode='add' onSubmit={handleAddSubmit}/>  
        </div>
        
    )
}

export default Add