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
        {dataArtists.map(dataArtist => (
          <SearchThumbArtist
            key={dataArtist._links.self.href}
            image={
              dataArtist._links.thumbnail.href.includes(
                '/assets/shared/missing_image.png'
              )
                ? 'https://via.placeholder.com/150'
                : dataArtist._links.thumbnail.href
            }
            title={dataArtist.title}
            id={dataArtist._links.self.href.replace(
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
              {suggestedGenes.map(suggestedGene => (
                <SearchThumb
                  key={suggestedGene.id}
                  image={suggestedGene._links.image.href.replace(
                    '{image_version}',
                    'square500'
                  )}
                  name={suggestedGene.name}
                  id={suggestedGene.id}
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
        {dataGenes.map(dataGene => (
          <SearchThumb
            key={dataGene._links.self.href}
            image={
              dataGene._links.thumbnail.href.includes(
                '/assets/shared/missing_image.png'
              )
                ? 'https://via.placeholder.com/150'
                : dataGene._links.thumbnail.href
            }
            title={dataGene.title}
            id={dataGene._links.self.href.replace(
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
          {suggestedShows.map(suggestedShow => (
            <React.Fragment key={suggestedShow.id}>
              <SearchThumb
                name={suggestedShow.name}
                image={
                  suggestedShow._links.thumbnail.href.includes(
                    '/assets/shared/missing_image.png'
                  )
                    ? 'https://via.placeholder.com/150'
                    : suggestedShow._links.thumbnail.href
                }
                key={suggestedShow.id}
                id={suggestedShow.id}
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
        {dataShows.map(dataShow => (
          <SearchThumb
            image={
              dataShow._links.thumbnail.href.includes(
                '/assets/shared/missing_image.png'
              )
                ? 'https://via.placeholder.com/150'
                : dataShow._links.thumbnail.href
            }
            title={dataShow.title}
            key={dataShow._links.self.href}
            id={dataShow._links.self.href.replace(
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
