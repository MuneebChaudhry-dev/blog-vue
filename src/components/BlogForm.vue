<template>
  <div class="w-full flex justify-center flex-col items-center gap-2">
    <div class="w-1/2">
      <div class="p-1 mt-3 rounded">
        <input
          class="p-2 w-full outline-none text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-emerald-400 focus:border-emerald-400"
          type="text"
          v-model="postTitle"
          placeholder="Enter Your Post Title"
        />
      </div>
      <div class="p-1 mt-3 rounded">
        <textarea
          rows="4"
          class="p-2.5 w-full outline-none text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-emerald-400 focus:border-emerald-400"
          type="text"
          v-model="postDescription"
          placeholder="Enter Your Post Description"
        ></textarea>
      </div>
      <div class="w-full flex justify-end">
        <button
          class="px-10 py-2.5 text-sm font-bold text-center text-white bg-gradient-to-r from-emerald-400 to-blue-500 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-gradient-to-r hover:from-blue-500 hover:to-emerald-400"
          @click="submitPost"
        >
          Post
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import { useFetch } from '../composable/fetch'

const postTitle: Ref<string> = ref('')
const postDescription: Ref<string> = ref('')

const submitPost = async () => {
  if (postTitle.value !== '') {
    try {
      const postData = {
        title: postTitle.value,
        description: postDescription.value
      }

      const { data, error } = await useFetch(
        `${import.meta.env.VITE_API_URL}/posts`,
        'POST',
        postData
      )

      console.log('Post submitted successfully:', data)
    } catch (error) {
      console.error('Error submitting post:', error)
    }
  }
}
</script>
<style></style>
