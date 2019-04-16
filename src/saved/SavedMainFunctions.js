import React from 'react'
import SavedCardArtwork from './SavedCardArtwork'
import SavedCardArtist from './SavedCardArtist'
import { ResultContainer, Button } from './SavedMainStyles'

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
        <div>
          {/* <h3>Could not load saved artworks.</h3> */}
          <Button onClick={() => loadBookmarks()}>Refresh</Button>
        </div>
      ) : artworkBookmarks.length ? (
        <div>
          {/* <h3>Loading ...</h3> */}
          <Button onClick={() => loadBookmarks()}>Refresh</Button>
        </div>
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
          <SavedCardArtist
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
        <div>
          {/* <h3>Could not load saved artists.</h3> */}
          <Button onClick={() => loadBookmarks()}>Refresh</Button>
        </div>
      ) : artistBookmarks.length ? (
        <div>
          {/* <h3>Loading ...</h3> */}
          <Button onClick={() => loadBookmarks()}>Refresh</Button>
        </div>
      ) : (
        <h3>No bookmarks yet</h3>
      )}
    </ResultContainer>
  )
}
