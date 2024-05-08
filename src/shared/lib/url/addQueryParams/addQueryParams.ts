export function getQueryParams(params: OptionalRecord<string, string>) {
    const searchParams = new URLSearchParams(window.location.search)
    Object.entries(params).forEach(([key, value]) => {
        if (!value) return
        searchParams.set(key, value)
    })

    return `?${searchParams.toString()}`
}

export function addQueryParams(params: OptionalRecord<string, string>) {
    window.history.pushState(null, '', getQueryParams(params))
}