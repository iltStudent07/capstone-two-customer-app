import { useState, useEffect } from 'react'

//used to store different values in browser memory based off of whats calling the hook
function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        const stored = localStorage.getItem(key)
        return stored ? JSON.parse(stored) : initialValue
    })
    //useEffect syncs state changes back to local storage
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue] as const
}

export default useLocalStorage