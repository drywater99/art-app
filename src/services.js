import axios from 'axios'
// const ip = process.env.REACT_APP_BACKEND_IP
// const cardsPath = `http://${ip}:4000/cards`

// export function getAllCards() {
//   return axios.get(cardsPath)
// }

export function getTopicData(url) {
  return axios.get(url, {
    headers: {
      'X-Xapp-Token':
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTU1MzEwMzE3NSwiaWF0IjoxNTUyNDk4Mzc1LCJhdWQiOiI1YzdmZjEyODZhZDY4NTc3ZTdiNTcwZjciLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWM4OTNlYzc4YjhkYTEyYjcwZWJlZjU0In0.GpApw2zXsP2EAZtJxgw7jYGE_RBlPmeb6D3OpdnOBu4',
    },
  })
}

export function getGeneData() {
  const urlString = 'https://api.artsy.net/api/genes?size=5'
  return axios.get(urlString, {
    headers: {
      'X-Xapp-Token':
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTU1MzEwMzE3NSwiaWF0IjoxNTUyNDk4Mzc1LCJhdWQiOiI1YzdmZjEyODZhZDY4NTc3ZTdiNTcwZjciLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWM4OTNlYzc4YjhkYTEyYjcwZWJlZjU0In0.GpApw2zXsP2EAZtJxgw7jYGE_RBlPmeb6D3OpdnOBu4',
    },
  })
}

export function getTrendingArtworkData() {
  const urlString = 'https://api.artsy.net/api/artworks?size=12'
  return axios.get(urlString, {
    headers: {
      'X-Xapp-Token':
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTU1MzEwMzE3NSwiaWF0IjoxNTUyNDk4Mzc1LCJhdWQiOiI1YzdmZjEyODZhZDY4NTc3ZTdiNTcwZjciLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWM4OTNlYzc4YjhkYTEyYjcwZWJlZjU0In0.GpApw2zXsP2EAZtJxgw7jYGE_RBlPmeb6D3OpdnOBu4',
    },
  })
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
