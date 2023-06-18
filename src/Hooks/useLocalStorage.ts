import { useEffect, useState } from "react"

type UseLocalStorageReturnType<T> = [T, (value: T) => void]

export const useLocalStorage = <T>(key: string, initialValue: T): UseLocalStorageReturnType<T> => {
	const [storedValue, setStoredValue] = useState<T>(() => {
		const item = localStorage.getItem(key)
		return item ? JSON.parse(item) : initialValue
	})

	const setValue = (value: T) => {
		setStoredValue(value)
		localStorage.setItem(key, JSON.stringify(value))
	}

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(storedValue))
	}, [storedValue])

	return [storedValue, setStoredValue] as UseLocalStorageReturnType<T> // Type assertion
}
