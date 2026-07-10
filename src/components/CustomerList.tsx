import type { Customer } from '../types/customer'
import { Link } from 'react-router-dom'
import { Fragment, useMemo, useState, type ChangeEvent } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

interface CustomerListProps {
    customers: Customer[]
    onDelete: (id: number) => void | Promise<void>
}

//Gets customer info and populates a list of customers based off the info 
function CustomerList({customers, onDelete}:CustomerListProps) {
    const [customerIdToDelete, setCustomerIdToDelete] = useState<number | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [sorting, setSorting] = useLocalStorage<{ key: keyof Customer; ascending: boolean }>('customerListSorting', { key: 'name', ascending: true })


    //filters down data from the customer array when typing in the search bar
    const filteredData = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.city.toLowerCase().includes(searchTerm.toLowerCase())
    )

    //Clears searchbar input
    const handleSearchClear = () => {
        setSearchTerm('')
    }

    

    //Handles the edit button in customer row
    const handleDeleteClick = (id: number) => {
        setCustomerIdToDelete(id)
    }

    //Handles the delete confirmation box yes button
    const handleConfirmDelete = async (id: number) => {
        await onDelete(id)
        setCustomerIdToDelete(null)
    }

    //Handles the delete confirmation box no button
    const handleCancelDelete = () => {
        setCustomerIdToDelete(null)
    }

    //Updates the list in real time as a user types
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    //sorts customers in the list alphabetically
    const sortedCustomers = useMemo(() => {
        return [...filteredData].sort((a, b) => {
            const valA = a[sorting.key]
            const valB = b[sorting.key]
            if (valA < valB) return sorting.ascending ? -1 : 1
            if (valA > valB) return sorting.ascending ? 1: -1
            return 0
        })
    }, [filteredData, sorting])

    const applySorting = (key: keyof Customer) => {
        if (sorting.key === key) {
            setSorting({...sorting, ascending: !sorting.ascending })
        } else {
            setSorting({key, ascending: true })
        }
    }


    if (filteredData.length === 0) <p>There was 0 matches</p>

    if (customers.length === 0) return <p>No customers found</p>
    
    return (
        <div>
            <div className="searchBarBox">
                <input
                    className="searchBar"
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <button
                    className="searchBtn"
                    type="button"
                    onClick={handleSearchClear}
                >X</button>
            </div>
        
            <div>
                {filteredData.length === 0 ? <p className="filterMess">No results found</p> : `Showing ${filteredData.length} of ${customers.length}`}
            </div>
            <table className="customerTable">
                <thead>
                    <tr >
                        <th onClick={() => applySorting('name')}>Name
                            <span>{sorting.key === 'name' ? (sorting.ascending ? '↑' : '↓') : ''}</span>
                        </th>
                        <th onClick={() => applySorting('email')}>Email
                            <span>{sorting.key === 'email' ? (sorting.ascending ? '↑' : '↓') : ''}</span>
                        </th>
                        <th>Phone</th>
                        <th onClick={() => applySorting('city')}>City
                            <span>{sorting.key === 'city' ? (sorting.ascending ? '↑' : '↓') : ''}</span>
                        </th>
                        <th className="actionCol">Actions</th>
                    </tr>
                </thead>
                 
                <tbody>
                     
                    {/* Renders a customer for every id it reads from the api json*/}
                    {sortedCustomers.map(customer => (
                        <Fragment key={customer.id}>
                            <tr>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.phone}</td>
                                <td>{customer.city}</td>
                                <td className="actionCol">
                                    <button className="editBtn"><Link to={`/edit/${customer.id}`}>Edit</Link></button>
                                    <button className="cancelBtn" onClick={() => handleDeleteClick(customer.id)}>Delete</button>
                                </td>
                            </tr>
                            {/* Matches the id of the delete button to the customer row and make a delete confirmation modal appear underneath that row */}
                            {customerIdToDelete === customer.id && (
                                <tr>
                                    <td className="confirmBox" colSpan={5}>
                                        <p>^ Are you sure you want to delete this customer? ^</p>
                                        <button className="modalConfirm" onClick={() => handleConfirmDelete(customer.id)}>Yes</button>
                                        <button className="modalCancel" onClick={handleCancelDelete}>No</button>
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