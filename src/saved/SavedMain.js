import React, { useEffect, useState, useMemo } from 'react'
import { BrowserRouter as Route } from 'react-router-dom'
import SwipeableRoutes from 'react-swipeable-routes'
import {
  PageGrid,
  Title,
  LinkContainer,
  StyledLink,
  ActiveUnderline,
} from './SavedMainStyles'
import { getSavedArtworkData, getSavedArtistData } from '../services'
import { SavedArtworksContent, SavedArtistsContent } from './SavedMainFunctions'

export default function SavedMain({
  props,
  onBookmark,
  artworkBookmarks,
  artistBookmarks,
}) {
  const [pageArtworks, setPageArtworks] = useState([])
  const [pageArtists, setPageArtists] = useState([])
  const [hasError, setHasError] = useState(false)
  const [isActive, setIsActive] = useState(1)

  useEffect(() => {
    if (props.location.pathname.includes('saved/artworks')) {
      setIsActive(1)
    } else if (props.location.pathname.includes('saved/artists')) {
      setIsActive(2)
    }
  }, [props.location])

  async function getData(array, getter, setter) {
    setHasError(false)
    const queue = array.reduce(async (promiseChain, bookmark) => {
      const chainResults = await promiseChain
      const currentResult = await getter(bookmark)
      return [...chainResults, currentResult.data]
    }, Promise.resolve([]))
    queue
      .then(Result => {
        setter(Result)
      })
      .catch(e => {
        console.error('Could not load bookmarks: ', e)
        setHasError(true)
      })
  }

  function loadArtworkBookmarks() {
    getData(artworkBookmarks, getSavedArtworkData, setPageArtworks)
  }

  function loadArtistBookmarks() {
    getData(artistBookmarks, getSavedArtistData, setPageArtists)
  }

  useMemo(() => artworkBookmarks.length && loadArtworkBookmarks(), [
    artworkBookmarks,
  ])

  useMemo(() => artistBookmarks.length && loadArtistBookmarks(), [
    artistBookmarks,
  ])

  useEffect(() => {
    loadArtistBookmarks()
    loadArtworkBookmarks()
  }, [])

  const SavedArtworks = () => (
    <SavedArtworksContent
      hasError={hasError}
      onBookmark={onBookmark}
      pageArtworks={pageArtworks}
      loadBookmarks={loadArtworkBookmarks}
      artworkBookmarks={artworkBookmarks}
      style={{ height: '100vh', 'overflow-y': 'scroll' }}
    />
  )

  const SavedArtists = () => (
    <SavedArtistsContent
      hasError={hasError}
      onBookmark={onBookmark}
      pageArtists={pageArtists}
      loadBookmarks={loadArtistBookmarks}
      artistBookmarks={artistBookmarks}
      style={{ height: '100vh', 'overflow-y': 'scroll' }}
    />
  )

  return (
    <PageGrid>
      <Title>Saved</Title>
      <LinkContainer>
        <StyledLink onClick={() => setIsActive(1)} to="/saved/artworks">
          Artworks
        </StyledLink>
        <StyledLink onClick={() => setIsActive(2)} to="/saved/artists">
          Artists
        </StyledLink>
      </LinkContainer>
      <ActiveUnderline
        style={
          isActive === 1
            ? { margin: '-1% 0 0 0' }
            : isActive === 2
            ? { margin: '-1% 0 0 50%' }
            : null
        }
      />
      <SwipeableRoutes>
        <Route exact path="/saved/artworks" component={SavedArtworks} />
        <Route exact path="/saved/artists" component={SavedArtists} />
      </SwipeableRoutes>
    </PageGrid>
  )
}
