<template>
  <v-container fluid class="pa-6">
    <v-card elevation="3">
      <v-card-title class="d-flex justify-space-between align-center bg-grey-lighten-4">
        <span class="text-h5">Users List</span>
        <v-btn 
          color="primary" 
          @click="handleFetchData"
          :loading="loading"
          prepend-icon="mdi-download"
        >
          Fetch Data from API
        </v-btn>
      </v-card-title>

      <v-card-text>
        <!-- Search Bar -->
        <v-row class="mb-4">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="searchQuery"
              label="Search by Name, Email, or City"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="compact"
              clearable
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="text-right d-flex align-center justify-end">
            <div class="text-subtitle-1">
              <v-icon class="mr-1">mdi-account-multiple</v-icon>
              Total Users: <strong>{{ pagination.total }}</strong>
            </div>
          </v-col>
        </v-row>

        <!-- User Table -->
        <UserTable
          :users="users"
          :loading="loading"
          :pagination="pagination"
          @edit="openEditDialog"
          @page-change="handlePageChange"
        />
      </v-card-text>
    </v-card>

    <!-- Edit Dialog -->
    <EditUserDialog
      v-model="editDialog"
      :user="selectedUser"
      :loading="loading"
      @save="handleSaveUser"
    />

    <!-- Notification Snackbar -->
    <AppSnackbar
      v-model="snackbar.show"
      :message="snackbar.message"
      :color="snackbar.color"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { userService } from '../services/userService'
import type { User, Pagination } from '../types/user'
import UserTable from '../components/UserTable.vue'
import EditUserDialog from '../components/EditUserDialog.vue'
import AppSnackbar from '../components/AppSnackbar.vue'

const users = ref<User[]>([])
const loading = ref(false)
const searchQuery = ref('')
const editDialog = ref(false)
const selectedUser = ref<User | null>(null)
const snackbar = ref({
  show: false,
  message: '',
  color: 'success'
})

const pagination = ref<Pagination>({
  page: 1,
  limit: 25,
  total: 0,
  totalPages: 0
})

const loadUsers = async () => {
  loading.value = true
  try {
    const response = await userService.getUsers(
      pagination.value.page,
      pagination.value.limit,
      searchQuery.value
    )
    users.value = response.data.data
    pagination.value = response.data.pagination
  } catch (error) {
    console.error('Error loading users:', error)
    showSnackbar('Failed to load users', 'error')
  } finally {
    loading.value = false
  }
}

const handleFetchData = async () => {
  loading.value = true
  try {
    await userService.fetchUsersFromAPI()
    showSnackbar('Users fetched successfully from API!', 'success')
    pagination.value.page = 1
    await loadUsers()
  } catch (error) {
    console.error('Error fetching users:', error)
    showSnackbar('Failed to fetch users from API', 'error')
  } finally {
    loading.value = false
  }
}

const openEditDialog = (user: User) => {
  selectedUser.value = { ...user }
  editDialog.value = true
}

const handleSaveUser = async (user: User) => {
  loading.value = true
  try {
    await userService.updateUser(user.uuid, {
      name: user.name,
      email: user.email,
      city: user.city
    })
    showSnackbar('User updated successfully!', 'success')
    editDialog.value = false
    await loadUsers()
  } catch (error) {
    console.error('Error updating user:', error)
    showSnackbar('Failed to update user', 'error')
  } finally {
    loading.value = false
  }
}

const handlePageChange = (page: number) => {
  pagination.value.page = page
  loadUsers()
}

const showSnackbar = (message: string, color: string = 'success') => {
  snackbar.value = {
    show: true,
    message,
    color
  }
}

// Watch for search changes with debounce
let searchTimeout: NodeJS.Timeout
watch(searchQuery, () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    pagination.value.page = 1
    loadUsers()
  }, 500)
})

onMounted(() => {
  loadUsers()
})
</script>
