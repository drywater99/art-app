import React, { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'
import HomeCard from '../common/CardArtwork'
import { getSavedArtworkData, getSavedArtistData } from '../services'

const PageGrid = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  -webkit-overflow-scrolling: touch;
`
const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  font-weight: bold;
  font-size: 25px;
  margin: 15px 24px 0;
  color: #383838;
  overflow: scroll;
`

const CardContainer = styled.section`
  display: grid;
  align-content: flex-start;
  justify-content: center;
  grid-gap: 12px;
  padding: 4px 12px 12px;
`

const Button = styled.button`
  display: block;
  width: 80%;
  height: 40px;
  border: 1px solid #999;
  padding: 8px 16px;
  font-size: 1em;
  border-radius: 4px;
  margin: 12px auto;
`

export default function SavedMain({
  onBookmark,
  artworkBookmarks,
  artistBookmarks,
}) {
  const [pageArtworks, setPageArtworks] = useState([])
  const [pageArtists, setPageArtists] = useState([])
  const [hasError, setHasError] = useState(false)

  useMemo(() => artworkBookmarks.length && loadArtworkBookmarks(), [
    artworkBookmarks,
  ])

  useMemo(() => artistBookmarks.length && loadArtistBookmarks(), [
    artistBookmarks,
  ])

  function loadArtworkBookmarks() {
    setHasError(false)
    const queue = artworkBookmarks.reduce(async (promiseChain, bookmark) => {
      const chainResults = await promiseChain
      const currentResult = await getSavedArtworkData(bookmark)
      return [...chainResults, currentResult.data]
    }, Promise.resolve([]))
    queue
      .then(Result => {
        setPageArtworks(Result)
      })
      .catch(e => {
        console.error('Could not load bookmarks: ', e)
        setHasError(true)
      })
  }

  function loadArtistBookmarks() {
    setHasError(false)
    const queue = artistBookmarks.reduce(async (promiseChain, bookmark) => {
      const chainResults = await promiseChain
      const currentResult = await getSavedArtistData(bookmark)
      return [...chainResults, currentResult.data]
    }, Promise.resolve([]))
    queue
      .then(Result => {
        setPageArtists(Result)
      })
      .catch(e => {
        console.error('Could not load bookmarks: ', e)
        setHasError(true)
      })
  }

  useEffect(() => {
    loadArtistBookmarks()
    loadArtworkBookmarks()
  }, [])

  return (
    <PageGrid>
      <Title>Saved</Title>
      <CardContainer>
        {pageArtworks.length ? (
          pageArtworks.map(a => (
            <HomeCard
              key={a.id}
              date={a.date}
              bookmarked={a.bookmarked}
              collecting_institution={a.collecting_institution}
              author={a.author}
              image={a._links.image.href.replace('{image_version}', 'large')}
              {...a}
              a={a}
              onBookmark={onBookmark}
            />
          ))
        ) : hasError ? (
          <div>
            <h3>Could not load saved artworks.</h3>
            <Button onClick={loadArtworkBookmarks}>Try again</Button>
          </div>
        ) : artworkBookmarks.length ? (
          <h3>Loading ...</h3>
        ) : (
          <h3>No bookmarks yet</h3>
        )}
      </CardContainer>
      <CardContainer>
        {pageArtists.length ? (
          pageArtists.map(a => (
            <HomeCard
              key={a.id}
              date={a.date}
              bookmarked={a.bookmarked}
              collecting_institution={a.collecting_institution}
              author={a.author}
              image={a._links.image.href.replace('{image_version}', 'large')}
              {...a}
              a={a}
              onBookmark={onBookmark}
            />
          ))
        ) : hasError ? (
          <div>
            <h3>Could not load saved artists.</h3>
            <Button onClick={loadArtistBookmarks}>Try again</Button>
          </div>
        ) : artistBookmarks.length ? (
          <h3>Loading ...</h3>
        ) : (
          <h3>No bookmarks yet</h3>
        )}
      </CardContainer>
    </PageGrid>
  )
}
