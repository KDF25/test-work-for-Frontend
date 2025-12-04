export function useLocalStorage<T>(key: string, defaultValue: T) {
    const load = (): T => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item, (key, value) => {
                // Восстановление Date объектов
                if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
                    return new Date(value)
                }
                return value
            }) : defaultValue
        } catch (error) {
            console.error(`Error loading ${key} from localStorage:`, error)
            return defaultValue
        }
    }

    const save = (value: T): void => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.error(`Error saving ${key} to localStorage:`, error)
        }
    }

    const remove = (): void => {
        try {
            window.localStorage.removeItem(key)
        } catch (error) {
            console.error(`Error removing ${key} from localStorage:`, error)
        }
    }

    return { load, save, remove }
}
