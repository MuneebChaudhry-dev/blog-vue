<template>
  <section class="w-full mt-16">
    <div class="flex p-2" v-for="post in data">
      <div
        class="w-1/6 rounded-l-md bg-emerald-400 min-h-16 inline-flex items-center justify-center text-white font-semibold"
      >
        Already Read
      </div>
      <div class="bg-white w-full p-4 border-y-2 border-gray-200">
        <h2
          class="mb-2 text-3xl font-extrabold tracking-tight text-gray-900 font-serif capitalize border-b border-gray-200"
        >
          {{ post.title }}
        </h2>
        <p class="mb-4 text-lg text-gray-600 dark:text-gray-400">
          {{ post.description }}
        </p>
      </div>
      <div class="bg-white w-1/12 rounded-r-md border-2 border-gray-200">
        <div
          class="bg-red-400 h-1/2 w-full text-white inline-flex items-center justify-center cursor-pointer"
        >
          Delete
        </div>
        <div
          class="bg-blue-400 h-1/2 w-full text-white inline-flex items-center justify-center cursor-pointer"
        >
          Edit
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useFetch } from '../composable/fetch'
const { data, error } = useFetch(`${import.meta.env.VITE_API_URL}/posts`)
watch(data, (newData) => {
  console.log(`x is ${newData}`)
})
</script>
<style></style>
