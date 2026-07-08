import { type CustomerFormData } from '../types/customer'
import { useState } from 'react'
import { Link } from 'react-router-dom'

interface FormProps {
    mode: 'add' | 'edit',
    initialData?: CustomerFormData
    onSubmit: (data: CustomerFormData) => void| Promise<void>
}

const emptyForm = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
}

function CustomerForm({mode, initialData, onSubmit}: FormProps) {
    //sets whether the form loads with data from a customer or an empty form based off of what mode the form is in
    const [formData, setFormData] = useState<CustomerFormData>(initialData ?? emptyForm)

    type FormKey = keyof CustomerFormData

    //Reads the name field in each input in the form and associates each form input value with that name
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const { name, value } = event.target
        const key = name as FormKey

        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }))
    }


    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) { 
        e.preventDefault()
        await onSubmit(formData)
    }

    return (
        <div>
            <h1>{mode === 'edit' ? 'Edit Customer' : 'Add Customer' }</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name: </label>
                    <input 
                    type="text" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}/>
                </div>
                <div>
                    <label>Email: </label>
                    <input 
                    type="text" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange} />
                </div>
                <div>
                    <label>Phone: </label>
                    <input 
                    type="text" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange} />
                </div>
                <div>
                    <label>Address: </label>
                    <input 
                    type="text" 
                    name="address" 
                    value={formData.address}
                    onChange={handleChange} />
                </div>
                <div>
                    <label>City: </label>
                    <input 
                    type="text" 
                    name="city" 
                    value={formData.city}
                    onChange={handleChange} />
                </div>
                <div>
                    <label>State: </label>
                    <input 
                    type="text" 
                    name="state" 
                    value={formData.state}
                    onChange={handleChange} />
                </div>
                <div>
                    <label>Zip: </label>
                    <input 
                    type="text" 
                    name="zip" 
                    value={formData.zip}
                    onChange={handleChange} />
                </div>
                <button type="submit">{mode === 'edit' ? 'Update Customer' : 'Add Customer' }</button>
                <button type="button"><Link to="/">Cancel</Link></button>  
            </form>
        </div>
    )
}

export default CustomerForm