import React from 'react'
import SearchThumbArtist from './SearchThumbArtist'
import SearchThumb from './SearchThumb'
import Roller from '../images/Roller.svg'
import {
  HeadlineContainer,
  ResultContainer,
  LoadingContainer,
} from './SearchMainStyles'

export function SearchContentArtists({
  searchString,
  isLoading,
  suggestedArtists,
  dataArtists,
}) {
  if (!searchString) {
    return isLoading ? (
      <LoadingContainer>
        <img alt="Roller" src={Roller} />
      </LoadingContainer>
    ) : (
      <React.Fragment>
        <HeadlineContainer>
          <h3>Suggested</h3>
        </HeadlineContainer>
        <ResultContainer>
          {suggestedArtists.map(suggestedArtist => (
            <SearchThumbArtist
              key={suggestedArtist.id}
              image={suggestedArtist._links.image.href.replace(
                '{image_version}',
                'square'
              )}
              name={suggestedArtist.name}
              id={suggestedArtist.id}
              urlCategory="artist"
            />
          ))}
        </ResultContainer>
      </React.Fragment>
    )
  } else if (dataArtists.length) {
    return (
      <ResultContainer>
        {dataArtists.map(a => (
          <SearchThumbArtist
            key={a._links.self.href}
            image={
              a._links.thumbnail.href.includes(
                '/assets/shared/missing_image.png'
              )
                ? 'https://via.placeholder.com/150'
                : a._links.thumbnail.href
            }
            title={a.title}
            id={a._links.self.href.replace(
              'https://api.artsy.net/api/artists/',
              ''
            )}
            urlCategory="artist"
          />
        ))}
      </ResultContainer>
    )
  } else {
    return (
      <HeadlineContainer>
        <h3>No results found</h3>
      </HeadlineContainer>
    )
  }
}

export function SearchContentGenes({
  searchString,
  isLoading,
  suggestedGenes,
  dataGenes,
}) {
  if (!searchString) {
    return (
      <React.Fragment>
        {isLoading ? (
          <LoadingContainer>
            <img alt="Roller" src={Roller} />
          </LoadingContainer>
        ) : (
          <React.Fragment>
            <HeadlineContainer>
              <h3>Suggested</h3>
            </HeadlineContainer>
            <ResultContainer>
              {suggestedGenes.map(g => (
                <SearchThumb
                  key={g.id}
                  image={g._links.image.href.replace(
                    '{image_version}',
                    'square500'
                  )}
                  name={g.name}
                  id={g.id}
                  urlCategory="gene"
                />
              ))}
            </ResultContainer>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  } else if (dataGenes.length) {
    return (
      <ResultContainer>
        {dataGenes.map(g => (
          <SearchThumb
            key={g._links.self.href}
            image={
              g._links.thumbnail.href.includes(
                '/assets/shared/missing_image.png'
              )
                ? 'https://via.placeholder.com/150'
                : g._links.thumbnail.href
            }
            title={g.title}
            id={g._links.self.href.replace(
              'https://api.artsy.net/api/genes/',
              ''
            )}
            urlCategory="gene"
          />
        ))}
      </ResultContainer>
    )
  } else {
    return (
      <HeadlineContainer>
        <h3>No results found</h3>
      </HeadlineContainer>
    )
  }
}

export function SearchContentShows({
  searchString,
  isLoading,
  suggestedShows,
  dataShows,
}) {
  if (!searchString) {
    return isLoading ? (
      <LoadingContainer>
        <img alt="Roller" src={Roller} />
      </LoadingContainer>
    ) : (
      <React.Fragment>
        <HeadlineContainer>
          <h3>Suggested</h3>
        </HeadlineContainer>
        <ResultContainer>
          {suggestedShows.map(s => (
            <React.Fragment key={s.id}>
              <SearchThumb
                name={s.name}
                image={
                  s._links.thumbnail.href.includes(
                    '/assets/shared/missing_image.png'
                  )
                    ? 'https://via.placeholder.com/150'
                    : s._links.thumbnail.href
                }
                key={s.id}
                id={s.id}
                urlCategory="show"
              />
            </React.Fragment>
          ))}
        </ResultContainer>
      </React.Fragment>
    )
  } else if (dataShows.length) {
    return (
      <ResultContainer>
        {dataShows.map(s => (
          <SearchThumb
            image={
              s._links.thumbnail.href.includes(
                '/assets/shared/missing_image.png'
              )
                ? 'https://via.placeholder.com/150'
                : s._links.thumbnail.href
            }
            title={s.title}
            key={s._links.self.href}
            id={s._links.self.href.replace(
              'https://api.artsy.net/api/shows/',
              ''
            )}
            urlCategory="show"
          />
        ))}
      </ResultContainer>
    )
  } else {
    return (
      <HeadlineContainer>
        <h3>No results found</h3>
      </HeadlineContainer>
    )
  }
}
