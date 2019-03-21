import axios from 'axios'
// const ip = process.env.REACT_APP_BACKEND_IP
// const cardsPath = `http://${ip}:4000/cards`

// export function getAllCards() {
//   return axios.get(cardsPath)
// }

const apiToken = {
  headers: {
    'X-Xapp-Token':
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTU1Mzc2Njc1OCwiaWF0IjoxNTUzMTYxOTU4LCJhdWQiOiI1YzdmZjEyODZhZDY4NTc3ZTdiNTcwZjciLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWM5MzVlZTY0OTVlNmQ3MTdiZmY2NzM5In0.-Oz9VmlcjMQTvpbIlrehE6en2STp1HpNhacO9roCRx0',
  },
}

export function getTopicData(url) {
  return axios.get(url, apiToken)
}

export function getGeneData() {
  const urlString = 'https://api.artsy.net/api/genes?size=50'
  return axios.get(urlString, apiToken)
}

export function getTrendingArtworkData() {
  const urlString = 'https://api.artsy.net/api/artworks?size=12'
  return axios.get(urlString, apiToken)
}

export function getTrendingArtistsData() {
  const urlString = 'https://api.artsy.net/api/artists?size=16&sort=-trending'
  return axios.get(urlString, apiToken)
}

export function getArtworkData(id) {
  const urlString = `https://api.artsy.net/api/artworks/${id}`
  return axios.get(urlString, apiToken)
}

export function getArtworkByHrefData(id) {
  const urlString = `${id}`
  return axios.get(urlString, apiToken)
}

export function getArtistByArtworkData(id) {
  const urlString = `https://api.artsy.net/api/artists?artwork_id=${id}`
  return axios.get(urlString, apiToken)
}

export function getSimilarArtworksToArtworkData(id) {
  const urlString = `https://api.artsy.net/api/artworks?similar_to_artwork_id=${id}`
  return axios.get(urlString, apiToken)
}

export function getArtworkGenesData(id) {
  const urlString = `https://api.artsy.net/api/genes?artwork_id=${id}`
  return axios.get(urlString, apiToken)
}

export function getGenesData(id) {
  const urlString = `https://api.artsy.net/api/genes/${id}`
  return axios.get(urlString, apiToken)
}

export function getGenesRelatedArtistsData(id) {
  const urlString = `https://api.artsy.net/api/artists?gene_id=${id}`
  return axios.get(urlString, apiToken)
}

export function getGeneRelatedArtworksData(id) {
  const urlString = `https://api.artsy.net/api/artworks?gene_id=${id}`
  return axios.get(urlString, apiToken)
}

export function getArtistData(id) {
  const urlString = `https://api.artsy.net/api/artists/${id}`
  return axios.get(urlString, apiToken)
}

export function getSearchQueryData(urlString) {
  return axios.get(urlString, apiToken)
}

export function getSuggestionsData(urlString) {
  return axios.get(urlString, apiToken)
}

// export function toggleCardBookmark(artwork) {
//   return axios.patch(`${cardsPath}/${card._id}`, {
//     bookmarked: !card.bookmarked,
//   })
// }

// export function getCardsFromStorage() {
//   return getFromStorage('cards') || []
// }

// export function saveCardsToStorage(cards) {
//   saveToStorage('cards', cards)
// }

// export function saveToStorage(name, data) {
//   const dataString = JSON.stringify(data)
//   localStorage.setItem(name, dataString)
// }

// export function getFromStorage(name) {
//   const dataString = localStorage.getItem(name)
//   try {
//     return JSON.parse(dataString)
//   } catch (error) {
//     console.error(error.message)
//   }
// }
