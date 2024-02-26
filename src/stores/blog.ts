import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { useFetch } from '../composable/fetch'

export const useBlogStore = defineStore('blog', () => {
  const postTitle: Ref<string> = ref('')
  const postDescription: Ref<string> = ref('')
  const isEdit: Ref<boolean> = ref(false)
  const postId: Ref<string> = ref('')

  const fetchPosts = async () => {
    try {
      const { data, error } = await useFetch(`${import.meta.env.VITE_API_URL}/posts`)
      if (data) {
        return data
      }
    } catch (error) {
      console.error('Error in fetching posts:', error)
    }
  }

  return { postTitle, postDescription, isEdit }
})
