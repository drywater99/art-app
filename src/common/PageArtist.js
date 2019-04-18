import React, { useEffect, useState } from 'react'
import ThumbSimGeneX from './ThumbSimGeneX'
import ThumbArtwork from './ThumbArtwork'
import ThumbSimArtistX from './ThumbSimArtistX'
import Icon from './Icon'
import Roller from '../images/Roller.svg'
import {
  getArtistData,
  getArtistGenesData,
  getArtistSimilarArtistsData,
  getArtistArtworksData,
} from '../services'
import {
  PageGrid,
  ImageCard,
  CancelButtonContainer,
  BookmarkContainer,
  ExploreContainer,
  ContentTitle,
  SectionTitle,
  ExploreContainerX,
  LoadingContainer,
} from './PageStyles'

export default function ArtistPage({ onBookmark, bookmarked, id }) {
  const [artist, setArtist] = useState([])
  const [artistGenes, setArtistGenes] = useState([])
  const [similarArtists, setSimilarArtists] = useState([])
  const [artistArtworks, setArtistArtworks] = useState([])
  const [isLoading, setIsLoading] = useState([])

  async function getArtist() {
    setIsLoading(true)
    try {
      const res = await getArtistData(id)
      setArtist([res.data])
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  async function getData(getter, setter, name) {
    setIsLoading(true)
    try {
      const res = await getter(id)
      setter(res.data._embedded[name])
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  async function getArtistArtworks() {
    getData(getArtistArtworksData, setArtistArtworks, 'artworks')
  }

  async function getArtistSimilarArtists() {
    getData(getArtistSimilarArtistsData, setSimilarArtists, 'artists')
  }

  async function getArtistsGenes() {
    getData(getArtistGenesData, setArtistGenes, 'genes')
  }

  useEffect(() => {
    getArtist()
    getArtistArtworks()
    getArtistSimilarArtists()
    getArtistsGenes()
  }, [id])

  function goBack() {
    window.history.back()
  }

  function renderBookmark(condition) {
    return (
      <Icon
        fill={condition ? '#b8847d' : '#949494'}
        name={`heart${condition ? '_active' : ''}`}
      />
    )
  }

  function PageArtistContent() {
    if (isLoading) {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} />
        </LoadingContainer>
      )
    } else if (artist.length) {
      return (
        <PageGrid>
          {artist.map(a => {
            const image = a._links.image.href.replace(
              '{image_version}',
              'large'
            )
            return (
              <div key={a.id}>
                <CancelButtonContainer onClick={goBack}>
                  <Icon name="cancel" />
                </CancelButtonContainer>
                <ImageCard
                  image={a._links.image.href.replace(
                    '{image_version}',
                    'large'
                  )}
                  style={{ backgroundImage: 'url(' + image + ')' }}
                />
                <BookmarkContainer onClick={() => onBookmark(id)}>
                  {renderBookmark(bookmarked)}
                </BookmarkContainer>
                <ContentTitle>
                  <p>{a.name}</p>
                  {a.birthday ? (
                    <small>
                      {a.birthday}-{a.deathday}
                    </small>
                  ) : (
                    ''
                  )}
                  {a.nationality ? <small>{a.nationality}</small> : ''}
                </ContentTitle>
                <SearchContentGenes />
                <SearchContentArtworks />
                <SearchContentSimilarArtist />
              </div>
            )
          })}
        </PageGrid>
      )
    } else {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} />
        </LoadingContainer>
      )
    }
  }

  function SearchContentArtworks() {
    if (isLoading) {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} />
        </LoadingContainer>
      )
    } else if (artistArtworks.length) {
      return (
        <React.Fragment>
          <SectionTitle>
            <h2>Artworks</h2>
          </SectionTitle>
          <ExploreContainer>
            {artistArtworks.map(artistArtwork => (
              <ThumbArtwork
                image={artistArtwork._links.image.href.replace(
                  '{image_version}',
                  'medium'
                )}
                title={artistArtwork.title}
                date={artistArtwork.date}
                key={artistArtwork.id}
                id={artistArtwork.id}
              />
            ))}
          </ExploreContainer>
        </React.Fragment>
      )
    } else {
      return null
    }
  }

  function SearchContentGenes() {
    if (isLoading) {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} />
        </LoadingContainer>
      )
    } else if (artistGenes.length) {
      return (
        <React.Fragment>
          <SectionTitle>
            <h2>Related Categories</h2>
          </SectionTitle>
          <ExploreContainerX>
            {artistGenes.map(artistGene => (
              <ThumbSimGeneX
                image={artistGene._links.image.href.replace(
                  '{image_version}',
                  'square500'
                )}
                name={artistGene.name}
                key={artistGene.id}
                id={artistGene.id}
              />
            ))}
          </ExploreContainerX>
        </React.Fragment>
      )
    } else {
      return null
    }
  }

  function SearchContentSimilarArtist() {
    if (isLoading) {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} />
        </LoadingContainer>
      )
    } else if (similarArtists.length) {
      return (
        <React.Fragment>
          <SectionTitle>
            <h2>Similar Artists</h2>
          </SectionTitle>
          <ExploreContainerX>
            {similarArtists.map(similarArtists => (
              <ThumbSimArtistX
                image={similarArtists._links.image.href.replace(
                  '{image_version}',
                  'square'
                )}
                name={similarArtists.name}
                key={similarArtists.id}
                id={similarArtists.id}
              />
            ))}
          </ExploreContainerX>
        </React.Fragment>
      )
    } else {
      return null
    }
  }

  return <PageArtistContent />
}
