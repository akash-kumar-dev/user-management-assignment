<template>
  <v-data-table
    :headers="headers"
    :items="users"
    :loading="loading"
    :items-per-page="pagination.limit"
    hide-default-footer
    class="elevation-1"
  >
    <template v-slot:item.actions="{ item }">
      <v-btn
        size="small"
        color="primary"
        variant="text"
        @click="$emit('edit', item)"
        icon
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>

    <template v-slot:bottom>
      <div class="text-center pa-4">
        <v-pagination
          :model-value="pagination.page"
          :length="pagination.totalPages"
          :total-visible="7"
          @update:model-value="$emit('page-change', $event)"
        ></v-pagination>
        <div class="text-caption mt-2">
          Showing {{ ((pagination.page - 1) * pagination.limit) + 1 }} 
          to {{ Math.min(pagination.page * pagination.limit, pagination.total) }} 
          of {{ pagination.total }} users
        </div>
      </div>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import type { User, Pagination } from '../types/user'

interface Props {
  users: User[]
  loading: boolean
  pagination: Pagination
}

interface Emits {
  (e: 'edit', user: User): void
  (e: 'page-change', page: number): void
}

defineProps<Props>()
defineEmits<Emits>()

const headers = [
  { title: 'Name', key: 'name', sortable: false },
  { title: 'Email', key: 'email', sortable: false },
  { title: 'City', key: 'city', sortable: false },
  { title: 'Actions', key: 'actions', sortable: false, align: 'center' as const }
]
</script>
