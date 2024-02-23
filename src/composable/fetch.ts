import { ref } from 'vue'

export function useFetch(url: string, requestMethod: string = 'GET', bodyData: any = null) {
  const data = ref(null)
  const error = ref(null)

  const requestOptions = {
    method: requestMethod,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (bodyData !== null) {
    requestOptions.body = JSON.stringify(bodyData)
  }
  fetch(url, requestOptions)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err))

  return { data, error }
}
