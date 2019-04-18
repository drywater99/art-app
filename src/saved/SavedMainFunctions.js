import React from 'react'
import SavedCardArtwork from './SavedCardArtwork'
import ThumbSimArtist from '../common/ThumbSimArtist'
import { ResultContainer, Button, ButtonContainer } from './SavedMainStyles'

export function SavedArtworksContent({
  hasError,
  pageArtworks,
  onBookmark,
  loadBookmarks,
  artworkBookmarks,
}) {
  return (
    <ResultContainer>
      {pageArtworks.length ? (
        pageArtworks.map(a => (
          <SavedCardArtwork
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
        <ButtonContainer>
          <Button onClick={() => loadBookmarks()}>Refresh</Button>
        </ButtonContainer>
      ) : artworkBookmarks.length ? (
        <ButtonContainer>
          <Button onClick={() => loadBookmarks()}>Refresh</Button>
          <h3>Loading ...</h3>
        </ButtonContainer>
      ) : (
        <small>No bookmarks yet</small>
      )}
    </ResultContainer>
  )
}

export function SavedArtistsContent({
  hasError,
  pageArtists,
  onBookmark,
  loadBookmarks,
  artistBookmarks,
}) {
  return (
    <ResultContainer>
      {pageArtists.length ? (
        pageArtists.map(a => (
          <ThumbSimArtist
            key={a.id}
            birthday={a.birthday}
            deathday={a.deathday}
            name={a.name}
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
        <ButtonContainer>
          <Button onClick={() => loadBookmarks()}>Refresh</Button>
        </ButtonContainer>
      ) : artistBookmarks.length ? (
        <ButtonContainer>
          <Button onClick={() => loadBookmarks()}>Refresh</Button>
          <h3>Loading ...</h3>
        </ButtonContainer>
      ) : (
        <h3>No bookmarks yet</h3>
      )}
    </ResultContainer>
  )
}
