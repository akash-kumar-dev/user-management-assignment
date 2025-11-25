import { apiClient } from './api'
import type { UsersResponse, ApiResponse, User } from '../types/user'

export const userService = {
  fetchUsersFromAPI: () => {
    return apiClient.post<ApiResponse>('/users/fetch')
  },

  getUsers: (page: number = 1, limit: number = 25, search: string = '') => {
    return apiClient.get<UsersResponse>('/users', {
      params: { page, limit, search }
    })
  },

  updateUser: (uuid: string, userData: Partial<User>) => {
    return apiClient.put<ApiResponse>(`/users/${uuid}`, userData)
  }
}
