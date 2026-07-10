import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import CustomerList from './CustomerList'
import type { Customer } from '../types/customer'

describe('CustomerList', () => {
	const customers: Customer[] = [
		{
			id: 1,
			name: 'Alice Johnson',
			email: 'alice@example.com',
			phone: '555-1111',
			address: '123 Main St',
			city: 'Seattle',
			state: 'WA',
			zip: '98101',
		},
		{
			id: 2,
			name: 'Bob Smith',
			email: 'bob@example.com',
			phone: '555-2222',
			address: '456 Oak Ave',
			city: 'Portland',
			state: 'OR',
			zip: '97201',
		},
		{
			id: 3,
			name: 'Carol Davis',
			email: 'carol@example.com',
			phone: '555-3333',
			address: '789 Pine Rd',
			city: 'San Francisco',
			state: 'CA',
			zip: '94102',
		},
	]
    
	it('renders all customer names from the provided list', () => {
		render(
			<MemoryRouter>
				<CustomerList customers={customers} onDelete={vi.fn()} />
			</MemoryRouter>
		)

		customers.forEach(({ name }) => {
			expect(screen.getByText(name)).toBeInTheDocument()
		})
	})

	it('shows a no customers found message for an empty array', () => {
		render(
			<MemoryRouter>
				<CustomerList customers={[]} onDelete={vi.fn()} />
			</MemoryRouter>
		)

		expect(screen.getByText('No customers found')).toBeInTheDocument()
	})

	it('calls onDelete with the correct customer ID only after confirming with Yes', async () => {
		const user = userEvent.setup()
		const onDelete = vi.fn()

		render(
			<MemoryRouter>
				<CustomerList customers={customers} onDelete={onDelete} />
			</MemoryRouter>
		)

		const bobRow = screen.getByText('Bob Smith').closest('tr')
		expect(bobRow).not.toBeNull()

		const deleteButton = within(bobRow as HTMLElement).getByRole('button', { name: 'Delete' })
		await user.click(deleteButton)

		expect(onDelete).not.toHaveBeenCalled()
		expect(screen.getByText('^ Are you sure you want to delete this customer? ^')).toBeInTheDocument()

		const yesButton = screen.getByRole('button', { name: 'Yes' })
		await user.click(yesButton)

		expect(onDelete).toHaveBeenCalledTimes(1)
		expect(onDelete).toHaveBeenCalledWith(2)
	})

	it('does not call onDelete when No is clicked', async () => {
		const user = userEvent.setup()
		const onDelete = vi.fn()

		render(
			<MemoryRouter>
				<CustomerList customers={customers} onDelete={onDelete} />
			</MemoryRouter>
		)

		const aliceRow = screen.getByText('Alice Johnson').closest('tr')
		expect(aliceRow).not.toBeNull()

		const deleteButton = within(aliceRow as HTMLElement).getByRole('button', { name: 'Delete' })
		await user.click(deleteButton)

		const noButton = screen.getByRole('button', { name: 'No' })
		await user.click(noButton)

		expect(onDelete).not.toHaveBeenCalled()
		expect(screen.queryByText('^ Are you sure you want to delete this customer? ^')).not.toBeInTheDocument()
	})

	it('renders edit links with the correct route for each customer', () => {
		render(
			<MemoryRouter>
				<CustomerList customers={customers} onDelete={vi.fn()} />
			</MemoryRouter>
		)

		customers.forEach(({ id, name }) => {
			const row = screen.getByText(name).closest('tr')
			expect(row).not.toBeNull()

			const editLink = within(row as HTMLElement).getByRole('link', { name: 'Edit' })
			expect(editLink).toHaveAttribute('href', `/edit/${id}`)
		})
	})
})
