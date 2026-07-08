import CustomerForm from '../components/CustomerForm'
import useCustomerApi from '../hooks/useCustomerApi'
import { type CustomerFormData } from '../types/customer'
import { useNavigate } from 'react-router-dom'

function Add() {
    const navigate = useNavigate()
    const { addCustomer } = useCustomerApi()

    async function handleAddSubmit(data: CustomerFormData) {
        await addCustomer(data)
        navigate('/')
    }

    function handleCancel() {
        navigate('/')
    }

    return (
        <div>
            <CustomerForm mode='add' onSubmit={handleAddSubmit} onCancel={handleCancel} />
        </div>
        
    )
}

export default Add