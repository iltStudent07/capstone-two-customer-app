import { useParams, useNavigate } from 'react-router-dom'
import CustomerForm from '../components/CustomerForm'
import { useCustomerContext } from '../context/CustomerContext'
import { type CustomerFormData } from '../types/customer'

function Edit() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { state: customerState, dispatch } = useCustomerContext()

    //Pulls in id from context, turns it into a number and puts up a guardrail against invalid id
    const customerId = Number(id)
    if (Number.isNaN(customerId)) return <p>Invalid customer id</p>

 

    //Gets customer info for initial data in edit form
    const currentCustomer = customerState.customers.find((c) => c.id === customerId)
    if (!currentCustomer) return <p>Customer not found</p>

    //Sets the initial data
    const editData: CustomerFormData = {
        name: currentCustomer.name,
        email: currentCustomer.email,
        phone: currentCustomer.phone,
        address: currentCustomer.address,
        city: currentCustomer.city,
        state: currentCustomer.state,
        zip: currentCustomer.zip
    }

    async function handleEditSubmit(data: CustomerFormData) {
        const response = await fetch(`/api/customers/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        if (!response.ok) throw new Error('There was an error editing the customer')
        const updatedCustomer = await response.json()
        dispatch({ type: 'UPDATE_CUSTOMER', payload: updatedCustomer })
        navigate('/')
    }

    return (
        <div>
           <h1>Edit Placeholder</h1>
            <CustomerForm mode='edit' initialData={editData} onSubmit={handleEditSubmit}/> 
        </div>
    )
}

export default Edit