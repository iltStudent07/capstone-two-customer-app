import { type CustomerFormData } from '../types/customer'
import { useState } from 'react'

interface FormProps {
    mode: 'add' | 'edit',
    initialData?: CustomerFormData
    onSubmit: (data: CustomerFormData) => void| Promise<void>
    onCancel: () => void
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

const emptyErrors: Record<keyof CustomerFormData, string> = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
}

const stateAbbreviationPattern = /^(AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY|DC)$/i

//Renders a form that user can use to add a customer or edit existing customer info
function CustomerForm({mode, initialData, onSubmit, onCancel}: FormProps) {
    //sets whether the form loads with data from a customer or an empty form
    const [formData, setFormData] = useState<CustomerFormData>(initialData ?? emptyForm)
    const [errors, setErrors] = useState<Record<keyof CustomerFormData, string>>(emptyErrors)

    type FormKey = keyof CustomerFormData

    const validateField = (field: FormKey, value: string): string => {
        const trimmedValue = value.trim()

        //Form field validation patterns
        switch (field) {
            case 'name':
                if (!trimmedValue) return 'Name is required.'
                if (!/^[A-Za-z\s]{2,}$/.test(trimmedValue)) return 'Name must be at least 2 letters.'
                return ''
            case 'email':
                if (!trimmedValue) return 'Email is required.'
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) return 'Please enter a valid email.'
                return ''
            case 'phone':
                if (!trimmedValue) return 'Phone is required.'
                if (!/^\d{3}-\d{4}$/.test(trimmedValue)) return 'Please enter a valid phone number.'
                return ''
            case 'address':
                if (!trimmedValue) return ''
                if (!/^[A-Za-z0-9\s]+$/.test(trimmedValue)) return 'Address cannot contain special characters.'
                return ''
            case 'city':
                if (!trimmedValue) return ''
                if (!/^[A-Za-z\s]+$/.test(trimmedValue)) return 'City cannot contain special characters.'
                return ''
            case 'state':
                if (!trimmedValue) return ''
                if (!stateAbbreviationPattern.test(trimmedValue)) return 'State must be a valid 2-letter abbreviation.'
                return ''
            case 'zip':
                if (!trimmedValue) return ''
                if (!/^\d{5}$/.test(trimmedValue)) return 'Zip must be a valid 5-digit zip code.'
                return ''
            default:
                return ''
        }
    }

    //Keeps track of form validation errors
    const validateForm = (data: CustomerFormData): Record<keyof CustomerFormData, string> => {
        const nextErrors: Record<keyof CustomerFormData, string> = { ...emptyErrors };

        (Object.keys(data) as FormKey[]).forEach((key) => {
            nextErrors[key] = validateField(key, data[key])
        })

        return nextErrors
    }

    const hasErrors = (validationErrors: Record<keyof CustomerFormData, string>) => {
        return Object.values(validationErrors).some((error) => error.length > 0)
    }

    //Reads the name field in each input in the form and associates each form input value with that name
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const { name, value } = event.target
        const key = name as FormKey

        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }))

        setErrors((prev) => ({
            ...prev,
            [key]: '',
        }))
    }


    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) { 
        e.preventDefault()

        const validationErrors = validateForm(formData)
        setErrors(validationErrors)

        if (hasErrors(validationErrors)) {
            return
        }

        await onSubmit(formData)
    }

    const getInputStyle = (field: FormKey) => ({
        border: `1px solid ${errors[field] ? 'red' : '#ccc'}`,
    })

    return (
        <div>
            <h1>{mode === 'edit' ? 'Edit Customer' : 'Add Customer' }</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>*Name: </label>
                    <input 
                    type="text" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    style={getInputStyle('name')}/>
                    {errors.name && <span style={{ color: 'red', marginLeft: '8px' }}>{errors.name}</span>}
                </div>
                <div>
                    <label>*Email: </label>
                    <input 
                    type="text" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    style={getInputStyle('email')} />
                    {errors.email && <span style={{ color: 'red', marginLeft: '8px' }}>{errors.email}</span>}
                </div>
                <div>
                    <label>*Phone: </label>
                    <input 
                    type="text" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    style={getInputStyle('phone')} />
                    {errors.phone && <span style={{ color: 'red', marginLeft: '8px' }}>{errors.phone}</span>}
                </div>
                <div>
                    <label>Address: </label>
                    <input 
                    type="text" 
                    name="address" 
                    value={formData.address}
                    onChange={handleChange}
                    style={getInputStyle('address')} />
                    {errors.address && <span style={{ color: 'red', marginLeft: '8px' }}>{errors.address}</span>}
                </div>
                <div>
                    <label>City: </label>
                    <input 
                    type="text" 
                    name="city" 
                    value={formData.city}
                    onChange={handleChange}
                    style={getInputStyle('city')} />
                    {errors.city && <span style={{ color: 'red', marginLeft: '8px' }}>{errors.city}</span>}
                </div>
                <div>
                    <label>State: </label>
                    <input 
                    type="text" 
                    name="state" 
                    value={formData.state}
                    onChange={handleChange}
                    style={getInputStyle('state')} />
                    {errors.state && <span style={{ color: 'red', marginLeft: '8px' }}>{errors.state}</span>}
                </div>
                <div>
                    <label>Zip: </label>
                    <input 
                    type="text" 
                    name="zip" 
                    value={formData.zip}
                    onChange={handleChange}
                    style={getInputStyle('zip')} />
                    {errors.zip && <span style={{ color: 'red', marginLeft: '8px' }}>{errors.zip}</span>}
                </div>
                <button type="submit">{mode === 'edit' ? 'Update Customer' : 'Add Customer' }</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    )
}

export default CustomerForm