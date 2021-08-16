const api_url = "https://restcountries.eu/rest/v2/"

export const countryService = {
  searchByName,
  getAll,
}

function searchByName(name, single) {
  name = name.toLowerCase()
  const key = single ? `${name}?fullText=true` : name

  return fetch(`${api_url}name/${key}`).then(handleResponse)
}

function getAll() {
  return fetch(`${api_url}all`).then(handleResponse)
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401) {
        location.reload(true)
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}
