<template>
  <v-snackbar
    v-model="snackbar"
    :color="color"
    :timeout="timeout"
  >
    {{ message }}
    <template v-slot:actions>
      <v-btn
        variant="text"
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  modelValue: boolean
  message: string
  color?: string
  timeout?: number
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  color: 'success',
  timeout: 3000
})

const emit = defineEmits<Emits>()

const snackbar = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  snackbar.value = newVal
})

watch(snackbar, (newVal) => {
  emit('update:modelValue', newVal)
})
</script>
