import { useParams, useNavigate } from 'react-router-dom'
import CustomerForm from '../components/CustomerForm'
import { useCustomerContext } from '../context/CustomerContext'
import { type CustomerFormData } from '../types/customer'
import useCustomerApi from '../hooks/useCustomerApi'

function Edit() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { state: customerState } = useCustomerContext()
    const { updateCustomer } = useCustomerApi()


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

    //Sends request to the server to update customer info
    async function handleEditSubmit(data: CustomerFormData) {
        updateCustomer(data)
        navigate('/')
    }

    function handleCancel() {
        navigate('/')
    }

    return (
        <div>
            <CustomerForm mode='edit' initialData={editData} onSubmit={handleEditSubmit} onCancel={handleCancel} />
        </div>
    )
}

export default Edit