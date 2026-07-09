import type { Customer } from '../types/customer'
import { Link } from 'react-router-dom'
import { Fragment, useState } from 'react'

interface CustomerListProps {
    customers: Customer[]
    onDelete: (id: number) => void | Promise<void>
}

//Gets customer info and populates a list of customers based off the info 
function CustomerList({customers, onDelete}:CustomerListProps) {
    const [customerIdToDelete, setCustomerIdToDelete] = useState<number | null>(null)

    if (customers.length === 0) return <p>No customers found</p>

    const handleDeleteClick = (id: number) => {
        setCustomerIdToDelete(id)
    }

    const handleConfirmDelete = async (id: number) => {
        await onDelete(id)
        setCustomerIdToDelete(null)
    }

    const handleCancelDelete = () => {
        setCustomerIdToDelete(null)
    }

    return (
        <div>
           <table>
                <thead>
                    <tr >
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>City</th>
                        <th>Actions</th>
                    </tr>
                </thead>  
                <tbody> 
                    {/* Renders a customer for every id it reads from the api json*/}  
                    {customers.map(customer => (
                    <Fragment key={customer.id}>
                        <tr>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.city}</td>
                            <td>
                                <button><Link to={`/edit/${customer.id}`}>Edit</Link></button>
                                <button onClick={() => handleDeleteClick(customer.id)}>Delete</button>
                            </td>
                        </tr>
                        {/* Matches the id of the delete button to the customer row and make a delete confirmation modal appear underneath that row */}
                        {customerIdToDelete === customer.id && (
                            <tr>
                                <td colSpan={5}>
                                    <p>Are you sure you want to delete this customer?</p>
                                    <button onClick={() => handleConfirmDelete(customer.id)}>Yes</button>
                                    <button onClick={handleCancelDelete}>No</button>
                                </td>
                            </tr>
                        )}
                    </Fragment>
                    ))}
                </tbody>
            </table>
        </div>
        
    )
}

export default CustomerList