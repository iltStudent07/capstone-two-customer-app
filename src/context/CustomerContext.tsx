import type { Customer } from '../types/customer'
import React, { useContext, useReducer, createContext, type ReactNode} from 'react'


type CustomerState = { 
    customers: Customer[] 
}


type CustomerAction =
    | { type: 'ADD_CUSTOMER'; payload: Customer }
    | { type: 'UPDATE_CUSTOMER'; payload: Customer }
    | { type: 'DELETE_CUSTOMER'; payload: number}
    | { type: 'SET_CUSTOMERS'; payload: Customer[]}

interface CustomerContextValue {
    state: CustomerState
    dispatch: React.Dispatch<CustomerAction>
}

//Function that helps manage state/context of the customer list across the app
function customerReducer (state: CustomerState, action: CustomerAction): CustomerState {
    switch (action.type) {
        //Adds a customer
        case 'ADD_CUSTOMER':
            return {
                ...state,
                customers: [...state.customers, action.payload],
            }
        //Replaces customer info with matching id with new customer info
        case 'UPDATE_CUSTOMER':
            return {
                ...state,
                customers: state.customers.map((customer) => 
                    customer.id === action.payload.id ? action.payload : customer)
            }
        //Removes customer by matching the id
        case 'DELETE_CUSTOMER':
            return {
                ...state,
                customers: state.customers.filter((customer) => customer.id !== action.payload)
            }
        //Resets the whole customer list in the app
        case 'SET_CUSTOMERS':
            return {
                ...state,
                customers: action.payload
            }
        default:
            return state
    }
}

const CustomerContext = createContext<CustomerContextValue | undefined>(undefined)

const initialCustomers: CustomerState = { customers: []}

//Provides context to all children components that it surrounds
export function CustomerProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(customerReducer, initialCustomers)

    return (
        <CustomerContext.Provider value={{state, dispatch }}>
            {children}
        </CustomerContext.Provider>
    )
}

export function useCustomerContext(): CustomerContextValue {
    const context = useContext(CustomerContext)
    if(!context) {
        throw new Error('useCustomerContext must be used within a CustomerContextProvider')
    }
    return context
}