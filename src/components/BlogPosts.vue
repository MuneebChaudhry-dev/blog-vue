<template>
  <div>
    <pre>{{ data }}</pre>
  </div>
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
