import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CustomerForm from './CustomerForm'
import type { CustomerFormData } from '../types/customer'

const validFormData: CustomerFormData = {
	name: 'Alice Johnson',
	email: 'alice@example.com',
	phone: '555-1234',
	address: '123 Main St',
	city: 'Seattle',
	state: 'WA',
	zip: '98101',
}

describe('CustomerForm', () => {
	it('shows validation errors when submitting an empty form', async () => {
		const user = userEvent.setup()
		const onSubmit = vi.fn()

		render(<CustomerForm mode="add" onSubmit={onSubmit} onCancel={vi.fn()} />)

		await user.click(screen.getByRole('button', { name: 'Add Customer' }))

		expect(screen.getByText('Name is required.')).toBeInTheDocument()
		expect(screen.getByText('Email is required.')).toBeInTheDocument()
		expect(screen.getByText('Phone is required.')).toBeInTheDocument()
		expect(onSubmit).not.toHaveBeenCalled()
	})

	it('calls onSubmit with form data when valid inputs are submitted', async () => {
		const user = userEvent.setup()
		const onSubmit = vi.fn()
		const { container } = render(<CustomerForm mode="add" onSubmit={onSubmit} onCancel={vi.fn()} />)

		const nameInput = container.querySelector('input[name="name"]') as HTMLInputElement
		const emailInput = container.querySelector('input[name="email"]') as HTMLInputElement
		const phoneInput = container.querySelector('input[name="phone"]') as HTMLInputElement
		const addressInput = container.querySelector('input[name="address"]') as HTMLInputElement
		const cityInput = container.querySelector('input[name="city"]') as HTMLInputElement
		const stateInput = container.querySelector('input[name="state"]') as HTMLInputElement
		const zipInput = container.querySelector('input[name="zip"]') as HTMLInputElement

		await user.type(nameInput, validFormData.name)
		await user.type(emailInput, validFormData.email)
		await user.type(phoneInput, validFormData.phone)
		await user.type(addressInput, validFormData.address)
		await user.type(cityInput, validFormData.city)
		await user.type(stateInput, validFormData.state)
		await user.type(zipInput, validFormData.zip)

		await user.click(screen.getByRole('button', { name: 'Add Customer' }))

		expect(onSubmit).toHaveBeenCalledTimes(1)
		expect(onSubmit).toHaveBeenCalledWith(validFormData)
	})

	it('calls onCancel when the cancel button is clicked', async () => {
		const user = userEvent.setup()
		const onCancel = vi.fn()

		render(<CustomerForm mode="add" onSubmit={vi.fn()} onCancel={onCancel} />)

		await user.click(screen.getByRole('button', { name: 'Cancel' }))

		expect(onCancel).toHaveBeenCalledTimes(1)
	})

	it('renders edit mode with initial data', () => {
		render(
			<CustomerForm
				mode="edit"
				initialData={validFormData}
				onSubmit={vi.fn()}
				onCancel={vi.fn()}
			/>
		)

		expect(screen.getByRole('heading', { name: 'Edit Customer' })).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Update Customer' })).toBeInTheDocument()
		expect(screen.getByDisplayValue(validFormData.name)).toBeInTheDocument()
		expect(screen.getByDisplayValue(validFormData.email)).toBeInTheDocument()
	})
})
