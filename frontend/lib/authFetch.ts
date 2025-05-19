import Cookies from 'js-cookie';

export async function authFetch(url: string, options: RequestInit = {}) {
    const token = Cookies.get('token');

    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        },
    });
}