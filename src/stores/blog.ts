import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blog', () => {
  const postTitle: Ref<string> = ref('')
  const postDescription: Ref<string> = ref('')
  const isEdit: Ref<boolean> = ref(false)
  const postId: Ref<string> = ref('')

  return { postTitle, postDescription, isEdit }
})
