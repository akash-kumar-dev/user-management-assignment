export interface User {
  id: number
  uuid: string
  name: string
  email: string
  city: string
  createdAt: string
  updatedAt: string
}

export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface UsersResponse {
  success: boolean
  data: User[]
  pagination: Pagination
}

export interface ApiResponse {
  success: boolean
  message?: string
  count?: number
}
