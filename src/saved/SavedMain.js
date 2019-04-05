import React, { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'
import HomeCard from '../common/CardArtwork'
import { getSavedArtworkData } from '../services'

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

export default function SavedMain({ onBookmark, artworks, bookmarks }) {
  const [pageArtworks, setPageArtworks] = useState([])
  const [hasError, setHasError] = useState(false)

  useMemo(() => bookmarks.length && loadBookmarks(), [bookmarks])

  function loadBookmarks() {
    setHasError(false)
    const queue = bookmarks.reduce(async (promiseChain, bookmark) => {
      const chainResults = await promiseChain
      const currentResult = await getSavedArtworkData(bookmark)
      return [...chainResults, currentResult.data]
    }, Promise.resolve([]))

    queue
      .then(results => {
        setPageArtworks(results)
      })
      .catch(e => {
        console.error('Could not load bookmarks: ', e)
        setHasError(true)
      })
  }
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
            <h3>Could not load Bookmarks.</h3>
            <Button onClick={loadBookmarks}>Try again</Button>
          </div>
        ) : bookmarks.length ? (
          <h3>Loading ...</h3>
        ) : (
          <h3>No bookmarks yet</h3>
        )}
      </CardContainer>
    </PageGrid>
  )
}
