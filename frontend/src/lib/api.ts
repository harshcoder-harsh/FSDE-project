const rawBase = import.meta.env.VITE_API_BASE_URL as string | undefined;

export const API_BASE_URL = rawBase ? rawBase.replace(/\/+$/, '') : '';

export function apiUrl(path: string) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalized}`;
}

