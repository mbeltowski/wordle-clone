import { useEffect, useState } from "react"

type UseLocalStorageReturnType<T> = [T, (value: T) => void]

export const useLocalStorage = <T>(key: string, initialValue: T): UseLocalStorageReturnType<T> => {
	const [storedValue, setStoredValue] = useState<T>(() => {
		const item = localStorage.getItem(key)
		return item ? JSON.parse(item) : initialValue
	})

	const setValue = (value: T) => {
		setStoredValue(value)
	}

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(storedValue))
		// eslint-disable-next-line
	}, [storedValue])

	return [storedValue, setValue] as UseLocalStorageReturnType<T>
}
