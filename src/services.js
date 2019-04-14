import axios from 'axios'

const apiToken = {
  headers: {
    'X-Xapp-Token':
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTU1NTY1NjA2NiwiaWF0IjoxNTU1MDUxMjY2LCJhdWQiOiI1YzdmZjEyODZhZDY4NTc3ZTdiNTcwZjciLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWNiMDMzMDI5NmI2MzY3YjFiNzZiNjk1In0.vLWth1Hk7CE059OUvV7XE8nAXLjIZCwz32a-Vvlut4Q',
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
  const urlString = 'https://api.artsy.net/api/artworks?size=4'
  return axios.get(urlString, apiToken)
}

export function getTrendingArtistsData() {
  const urlString =
    'https://api.artsy.net/api/artists?similarity_type=contemporary&artworks=true&sort=-trending&size=8'
  return axios.get(urlString, apiToken)
}

export function getShowData() {
  const urlString = 'https://api.artsy.net/api/shows?status=running'
  return axios.get(urlString, apiToken)
}

export function getArtworksByArtistsData(id) {
  const urlString = `https://api.artsy.net/api/artworks?artist_id=${id}`
  return axios.get(urlString, apiToken)
}

export function getArtworkData(id) {
  const urlString = `https://api.artsy.net/api/artworks/${id}`
  return axios.get(urlString, apiToken)
}

export function getSavedArtworkData(bookmark) {
  const urlString = `https://api.artsy.net/api/artworks/${bookmark}`
  return axios.get(urlString, apiToken)
}

export function getSavedArtistData(bookmark) {
  const urlString = `https://api.artsy.net/api/artists/${bookmark}`
  return axios.get(urlString, apiToken)
}

export function getArtistByArtworkData(id) {
  const urlString = `https://api.artsy.net/api/artists?artwork_id=${id}`
  return axios.get(urlString, apiToken)
}
export function getArtistArtworksData(id) {
  const urlString = `https://api.artsy.net/api/artworks?artist_id=${id}&size=24`
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

export function getArtistGenesData(id) {
  const urlString = `https://api.artsy.net/api/genes?artist_id=${id}`
  return axios.get(urlString, apiToken)
}

export function getArtistSimilarArtistsData(id) {
  const urlString = `https://api.artsy.net/api/artists?similar_to_artist_id=${id}`
  return axios.get(urlString, apiToken)
}

export function getSearchQueryArtistData(searchString) {
  const urlString = `https://api.artsy.net/api/search?q=${searchString}&offset=0&size=10&type=artist`
  return axios.get(urlString, apiToken)
}

export function getSearchQueryGeneData(searchString) {
  const urlString = `https://api.artsy.net/api/search?q=${searchString}
  &offset=0&size=10&type=gene`
  return axios.get(urlString, apiToken)
}

export function getSearchQueryShowData(searchString) {
  const urlString = `https://api.artsy.net/api/search?q=${searchString}&offset=0&size=10&type=show`
  return axios.get(urlString, apiToken)
}

export function getSuggestionsArtistData() {
  const urlString = `https://api.artsy.net/api/artists?similarity_type=contemporary&artworks=true&sort=-trending&size=10`
  return axios.get(urlString, apiToken)
}

export function getSuggestionsGenesData() {
  const urlString = `https://api.artsy.net/api/genes?size=10`
  return axios.get(urlString, apiToken)
}

export function getSuggestionsShowData() {
  const urlString = `https://api.artsy.net/api/shows?status=current&size=10`
  return axios.get(urlString, apiToken)
}

export function getTopicsAData() {
  const urlString = 'https://api.artsy.net/api/artworks?size=25'
  return axios.get(urlString, apiToken)
}

export function getTopicsBData() {
  const urlString =
    'https://api.artsy.net/api/artists?gene_id=4d90d190dcdd5f44a500003f&size=30'
  return axios.get(urlString, apiToken)
}

export function getTopicsCData() {
  const urlString =
    'https://api.artsy.net/api/artworks?gene_id=50356574ab74980002000005&size=20'
  return axios.get(urlString, apiToken)
}
export function getTopicsDData() {
  const urlString =
    'https://api.artsy.net/api/artworks?gene_id=4d9396db17cb132537000480&size=30'
  return axios.get(urlString, apiToken)
}
export function getTopicsEData() {
  const urlString =
    'https://api.artsy.net/api/artworks?gene_id=4dcdf920522d6e00010042ca&size=20'
  return axios.get(urlString, apiToken)
}
export function getTopicsFData() {
  const urlString =
    'https://api.artsy.net/api/artworks?gene_id=4d90d192dcdd5f44a500006b&size=20'
  return axios.get(urlString, apiToken)
}

export function getSingleShowData(id) {
  const urlString = `https://api.artsy.net/api/shows/${id}`
  return axios.get(urlString, apiToken)
}

export function getShowImagesData(id) {
  const urlString = `https://api.artsy.net/api/images?show_id=${id}`
  return axios.get(urlString, apiToken)
}

export function getShowArtworksData(id) {
  const urlString = `https://api.artsy.net/api/artworks?show_id=${id}`
  return axios.get(urlString, apiToken)
}

export function saveArtworkBookmarksToStorage(data) {
  saveArtworksToStorage('artworkBookmarks', data)
}

export function saveArtworksToStorage(name, data) {
  const dataString = JSON.stringify(data)
  localStorage.setItem(name, dataString)
}

export function getArtworkBookmarksFromStorage() {
  return getArtworksFromStorage('artworkBookmarks')
}

export function getArtworksFromStorage(name) {
  const dataString = localStorage.getItem(name)
  try {
    return JSON.parse(dataString)
  } catch (error) {
    console.error(error.message)
  }
}
export function saveArtistBookmarksToStorage(data) {
  saveArtistToStorage('artistBookmarks', data)
}

export function saveArtistToStorage(name, data) {
  const dataString = JSON.stringify(data)
  localStorage.setItem(name, dataString)
}

export function getArtistBookmarksFromStorage() {
  return getArtistFromStorage('artistBookmarks')
}

export function getArtistFromStorage(name) {
  const dataString = localStorage.getItem(name)
  try {
    return JSON.parse(dataString)
  } catch (error) {
    console.error(error.message)
  }
}
