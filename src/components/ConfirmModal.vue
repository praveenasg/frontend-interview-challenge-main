<script setup lang="ts">
defineProps<{ show: boolean; message: string }>();
const emit = defineEmits(["confirm", "cancel"]);
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
      <p class="text-lg font-semibold">{{ message }}</p>
      <div class="mt-4 flex justify-around">
        <button
          @click="emit('confirm')"
          class="bg-red-700 text-white px-4 py-2 rounded"
        >
          Yes, Delete
        </button>
        <button
          @click="emit('cancel')"
          class="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
