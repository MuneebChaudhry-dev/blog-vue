import { ref } from 'vue'

export async function useFetch(url: string, requestMethod: string = 'GET', bodyData: any = null) {
  let data = ''
  let error = ''

  const requestOptions = {
    method: requestMethod,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (bodyData !== null) {
    requestOptions.body = JSON.stringify(bodyData)
  }
  await fetch(url, requestOptions)
    .then((res) => res.json())
    .then((json) => (data = json))
    .catch((err) => (error = err))

  return { data, error }
}
