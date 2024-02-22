<template>
  <div>
    <pre>{{ data }}</pre>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useFetch } from '../composable/fetch'
const { data, error } = useFetch('http://localhost:3000/posts')
watch(data, (newData) => {
  console.log(`x is ${newData}`)
})
</script>
<style></style>
