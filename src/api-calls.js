export function sendApiGetRequest (url) {
  return fetch(url)
  .then(response => response.json())
  .then(response => response)
}
