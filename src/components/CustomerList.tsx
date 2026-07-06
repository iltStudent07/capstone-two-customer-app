import type { Customer } from '../types/customer'
import { useState, useEffect } from 'react'

interface CustomerListProps {
    id: number
}

//Gets customer info and populates a list of customers based off the info 
function CustomerList({id}:CustomerListProps) {
    const [customers, setCustomers] = useState<Customer[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    
    useEffect(() => {
        fetch('/api/customers')
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
                return res.json()
            })
            .then((data: Customer[]) => {
                setCustomers(data)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [id])

    if (loading) return <p>Loading Customer List</p>
    if (error) return <p style={{ color: 'red'}}>Error: {error}</p>
    if (customers.length === 0) return <p>No customers found</p>

    return (
        <table>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th>Actions</th>
            </tr>
            {customers.map(customer => (
                <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.city}</td>
                    <td>
                        <button>Edit</button>
                        <button>Delete</button>
                    </td>
                </tr>
            ))}
        </table>
    )
}

export default CustomerList