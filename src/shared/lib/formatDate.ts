export const formatDate = (date: Date | null): string => {
    if (!date) return '—'
    return new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(date))
}

export const truncateText = (text: string, maxLength: number = 30): string => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
}
