import { User, Post, ApiError } from '@/types';
import { API_CONFIG } from '@/lib/constants';

const API_BASE_URL = API_CONFIG.BASE_URL;

async function fetchApi<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);

    if (!response.ok) {
      const error: ApiError = {
        message: `API Error: ${response.statusText}`,
        status: response.status,
      };
      throw error;
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    if ((error as ApiError).status) {
      throw error;
    }

    const apiError: ApiError = {
      message: 'Netzwerkfehler. Bitte überprüfen Sie Ihre Internetverbindung.',
    };
    throw apiError;
  }
}

export async function fetchUsers(): Promise<User[]> {
  return fetchApi<User[]>('/users');
}

export async function fetchUserById(id: number): Promise<User> {
  return fetchApi<User>(`/users/${id}`);
}

export async function fetchPostsByUser(userId: number): Promise<Post[]> {
  return fetchApi<Post[]>(`/posts?userId=${userId}`);
}

export async function fetchAllPosts(): Promise<Post[]> {
  return fetchApi<Post[]>('/posts');
}
