<template>
  <div class="w-full flex justify-center flex-col items-center gap-2">
    <div class="w-1/2">
      <div class="p-1 mt-3 rounded">
        <input
          class="p-2 w-full outline-none text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-emerald-400 focus:border-emerald-400"
          type="text"
          v-model="blogStore.postTitle"
          placeholder="Enter Your Post Title"
        />
      </div>
      <div class="p-1 mt-3 rounded">
        <textarea
          rows="4"
          class="p-2.5 w-full outline-none text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-emerald-400 focus:border-emerald-400"
          type="text"
          v-model="blogStore.postDescription"
          placeholder="Enter Your Post Description"
        ></textarea>
      </div>
      <div class="w-full flex justify-end">
        <button
          class="px-10 py-2.5 text-sm font-bold text-center text-white bg-gradient-to-r from-emerald-400 to-blue-500 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-gradient-to-r hover:from-blue-500 hover:to-emerald-400"
          @click="submitPost"
        >
          {{ blogStore.isEdit ? 'Update' : 'Post' }}
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import { useFetch } from '../composable/fetch'

import { useBlogStore } from '../stores/blog'

const blogStore = useBlogStore()
const submitPost = () => {
  if (blogStore.isEdit) {
    updatePost()
  } else {
    createNewPost()
  }
}
const createNewPost = async () => {
  if (blogStore.postTitle !== '') {
    try {
      const postData = {
        title: blogStore.postTitle,
        description: blogStore.postDescription,
        isRead: false
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
const updatePost = async () => {
  if (blogStore.postTitle !== '') {
    try {
      const postData = {
        title: blogStore.postTitle,
        description: blogStore.postDescription,
        isRead: false
      }

      const { data, error } = await useFetch(
        `${import.meta.env.VITE_API_URL}/posts/${blogStore.postId}`,
        'PATCH',
        postData
      )

      console.log('Post updated successfully:', data)
      blogStore.isEdit = false
      blogStore.postTitle = ''
      blogStore.postDescription = ''
    } catch (error) {
      console.error('Error updating post:', error)
    }
  }
}
</script>
<style></style>
