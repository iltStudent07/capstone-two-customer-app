import type { Customer } from '../types/customer'
import { Link } from 'react-router-dom'

interface CustomerListProps {
    customers: Customer[]
    onDelete: (id: number) => void
}

//Gets customer info and populates a list of customers based off the info 
function CustomerList({customers, onDelete}:CustomerListProps) {

    if (customers.length === 0) return <p>No customers found</p>

    return (
        <table style={{ width: '100%' }}>
            <tbody>
                <tr style={{ borderBottom: '10px solid #333'}}>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>Actions</th>
                </tr>
                {customers.map(customer => (
                <tr key={customer.id} >
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.city}</td>
                    <td>
                        <button><Link to={`/edit/${customer.id}`}>Edit</Link></button>
                        <button onClick={() => onDelete(customer.id)}>Delete</button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    )
}

export default CustomerList