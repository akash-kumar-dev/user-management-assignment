<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Edit User</span>
      </v-card-title>
      
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="editedUser.name"
                label="Name"
                variant="outlined"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedUser.email"
                label="Email"
                variant="outlined"
                type="email"
                :rules="[rules.required, rules.email]"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedUser.city"
                label="City"
                variant="outlined"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="grey"
          variant="text"
          @click="closeDialog"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          variant="elevated"
          @click="saveUser"
          :loading="loading"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { User } from '../types/user'

interface Props {
  modelValue: boolean
  user: User | null
  loading?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'save', user: User): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const dialog = ref(props.modelValue)
const editedUser = ref<User>({
  id: 0,
  uuid: '',
  name: '',
  email: '',
  city: '',
  createdAt: '',
  updatedAt: ''
})

const rules = {
  required: (value: string) => !!value || 'This field is required',
  email: (value: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(value) || 'Invalid email address'
  }
}

watch(() => props.modelValue, (newVal) => {
  dialog.value = newVal
  if (newVal && props.user) {
    editedUser.value = { ...props.user }
  }
})

watch(dialog, (newVal) => {
  emit('update:modelValue', newVal)
})

const closeDialog = () => {
  dialog.value = false
}

const saveUser = () => {
  emit('save', editedUser.value)
}
</script>
