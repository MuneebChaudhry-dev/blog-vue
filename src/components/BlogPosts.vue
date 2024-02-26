<template>
  <section class="w-full mt-16" v-if="postsData && postsData.length">
    <!-- <pre>{{ postsData }}</pre> -->
    <div class="flex p-2" v-for="post in postsData" :key="post.id">
      <div
        :class="{ 'bg-emerald-400': post.isRead, 'bg-blue-500': !post.isRead }"
        class="w-1/6 rounded-l-md min-h-16 inline-flex items-center justify-center text-white font-semibold cursor-pointer"
        @click="togglIsRead(post.isRead, post.id)"
      >
        {{ post.isRead ? 'Already Read' : 'Mark Read' }}
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
          @click="deletePost(post.id)"
        >
          Delete
        </div>
        <div
          class="bg-blue-400 h-1/2 w-full text-white inline-flex items-center justify-center cursor-pointer"
          @click="editPost(post.id)"
        >
          Edit
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
import { useFetch } from '../composable/fetch'
import { useBlogStore } from '@/stores/blog'

const postsData = ref([])
const blogStore = useBlogStore()

const deletePost = async (postID: string) => {
  try {
    const { data, error } = await useFetch(
      `${import.meta.env.VITE_API_URL}/posts/${postID}`,
      'DELETE'
    )
    console.log('Post Deleted successfully:', data.value, error.value)
  } catch (error) {
    console.error('Error in Deleting  post:', error)
  }
}

const togglIsRead = async (isRead: boolean, postId: string) => {
  try {
    const postData = {
      isRead: !isRead
    }

    const { data, error } = await useFetch(
      `${import.meta.env.VITE_API_URL}/posts/${postId}`,
      'PATCH',
      postData
    )

    console.log('isRead toggled', data)
  } catch (error) {
    console.error('Error updating post:', error)
  }
}

const editPost = async (postID: string) => {
  const { data, error } = await useFetch(`${import.meta.env.VITE_API_URL}/posts/${postID}`, 'GET')
  console.log('Edit', data)

  blogStore.isEdit = true
  blogStore.postTitle = data.title
  blogStore.postDescription = data.description
  blogStore.postId = postID
}
watchEffect(async () => {
  try {
    const { data, error } = await useFetch(`${import.meta.env.VITE_API_URL}/posts`)
    if (data) {
      postsData.value = data
      console.log('New Data:', postsData.value)
    }
  } catch (error) {
    console.error('Error in fetching posts:', error)
  }
})
</script>

<style></style>
