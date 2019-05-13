import axios from 'axios'

const apiToken = {
  headers: {
    'X-Xapp-Token':
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTU1ODM3OTkwMiwiaWF0IjoxNTU3Nzc1MTAyLCJhdWQiOiI1YzdmZjEyODZhZDY4NTc3ZTdiNTcwZjciLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWNkOWMyZmVjOWRhNjQyYzUwZGFjZmZmIn0.JE2hWQTZjwPg97UlsZY8cwb369vvpwm1HzCw0PhPp7c',
  },
}

function getFromArtsy(path) {
  const urlString = 'https://api.artsy.net/api/' + path
  return axios.get(urlString, apiToken)
}

export function getTrendingArtworkData() {
  const path = 'artworks?size=4'
  return getFromArtsy(path)
}

export function getTrendingArtistsData() {
  const path =
    'artists?similarity_type=contemporary&artworks=true&sort=-trending&size=8'
  return getFromArtsy(path)
}

export function getShowData() {
  const path = 'shows?status=running'
  return getFromArtsy(path)
}

export function getArtworksByArtistsData(id) {
  const path = `https://api.artsy.net/api/artworks?artist_id=${id}`
  return getFromArtsy(path)
}

export function getArtworkData(id) {
  const path = `artworks/${id}`
  return getFromArtsy(path)
}

export function getSavedArtworkData(bookmark) {
  const path = `artworks/${bookmark}`
  return getFromArtsy(path)
}

export function getSavedArtistData(bookmark) {
  const path = `artists/${bookmark}`
  return getFromArtsy(path)
}

export function getArtistByArtworkData(id) {
  const path = `artists?artwork_id=${id}`
  return getFromArtsy(path)
}
export function getArtistArtworksData(id) {
  const path = `artworks?artist_id=${id}&size=24`
  return getFromArtsy(path)
}

export function getSimilarArtworksToArtworkData(id) {
  const path = `artworks?similar_to_artwork_id=${id}`
  return getFromArtsy(path)
}

export function getArtworkGenesData(id) {
  const path = `genes?artwork_id=${id}`
  return getFromArtsy(path)
}

export function getGenesData(id) {
  const path = `genes/${id}`
  return getFromArtsy(path)
}

export function getGenesRelatedArtistsData(id) {
  const path = `artists?gene_id=${id}`
  return getFromArtsy(path)
}

export function getGeneRelatedArtworksData(id) {
  const path = `artworks?gene_id=${id}`
  return getFromArtsy(path)
}

export function getArtistData(id) {
  const path = `artists/${id}`
  return getFromArtsy(path)
}

export function getArtistGenesData(id) {
  const path = `genes?artist_id=${id}`
  return getFromArtsy(path)
}

export function getArtistSimilarArtistsData(id) {
  const path = `artists?similar_to_artist_id=${id}`
  return getFromArtsy(path)
}

export function getSearchQueryArtistData(searchString) {
  const path = `search?q=${searchString}&offset=0&size=10&type=artist`
  return getFromArtsy(path)
}

export function getSearchQueryGeneData(searchString) {
  const path = `search?q=${searchString}
  &offset=0&size=10&type=gene`
  return getFromArtsy(path)
}

export function getSearchQueryShowData(searchString) {
  const path = `search?q=${searchString}&offset=0&size=10&type=show`
  return getFromArtsy(path)
}

export function getSuggestionsArtistData() {
  const path = `artists?similarity_type=contemporary&artworks=true&sort=-trending&size=10`
  return getFromArtsy(path)
}

export function getSuggestionsGenesData() {
  const path = `genes?size=10`
  return getFromArtsy(path)
}

export function getSuggestionsShowData() {
  const path = `shows?status=current&size=10`
  return getFromArtsy(path)
}

export function getTopicsAData() {
  const path = 'artworks?size=25'
  return getFromArtsy(path)
}

export function getTopicsBData() {
  const path = 'artists?gene_id=4d90d190dcdd5f44a500003f&size=30'
  return getFromArtsy(path)
}

export function getTopicsCData() {
  const path = 'artworks?gene_id=50356574ab74980002000005&size=20'
  return getFromArtsy(path)
}
export function getTopicsDData() {
  const path = 'artworks?gene_id=4d9396db17cb132537000480&size=30'
  return getFromArtsy(path)
}
export function getTopicsEData() {
  const path = 'artworks?gene_id=4dcdf920522d6e00010042ca&size=20'
  return getFromArtsy(path)
}
export function getTopicsFData() {
  const path = 'artworks?gene_id=4d90d192dcdd5f44a500006b&size=20'
  return getFromArtsy(path)
}

export function getSingleShowData(id) {
  const path = `shows/${id}`
  return getFromArtsy(path)
}

export function getShowImagesData(id) {
  const path = `images?show_id=${id}`
  return getFromArtsy(path)
}

export function getShowArtworksData(id) {
  const path = `artworks?show_id=${id}`
  return getFromArtsy(path)
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
