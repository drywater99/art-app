import React from 'react'
import HomeCard from '../common/CardArtwork'
import { CardContainer, Button } from './SavedMainStyles'

export function SavedArtworksContent({
  hasError,
  pageArtworks,
  onBookmark,
  loadArtworkBookmarks,
  artworkBookmarks,
}) {
  return (
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
  )
}

export function SavedArtistsContent({
  hasError,
  pageArtists,
  onBookmark,
  loadArtistBookmarks,
  artistBookmarks,
}) {
  return (
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
  )
}
