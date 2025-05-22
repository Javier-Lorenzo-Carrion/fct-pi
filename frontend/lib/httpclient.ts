export async function httpClient(path: string, options: RequestInit = {}) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${path}`;
    const headers = {
        ...options.headers,
        'Content-Type': 'application/json',
    }

    return fetch(url, {...options, headers});
}

export async function httpClientItSelf(path: string, options: RequestInit = {}) {
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${path}`;
    const headers = {
        ...options.headers,
        'Content-Type': 'application/json',
    }

    return fetch(url, {...options, headers});
}

export async function authHttpClient(path: string, options: RequestInit = {}) {
    const token = localStorage.getItem('token');
    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
    }

    return httpClient(path, {...options, headers})
}
