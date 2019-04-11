import React, { useEffect, useState } from 'react'
import ThumbSimGeneX from './ThumbSimGeneX'
import ThumbArtwork from './ThumbArtwork'
import ThumbSimArtistX from './ThumbSimArtistX'
import Icon from '../app/Icon'
import Roller from '../images/Roller.svg'
import {
  getArtistData,
  getArtistByArtworkData,
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
} from './PageArtistStyles'

export default function ArtistPage({ onBookmark, bookmarked, id }) {
  const [artist, setHomeArtist] = useState([])
  const [artistGenes, setArtistGenes] = useState([])
  const [similarArtists, setSimilarArtists] = useState([])
  const [artistArtworks, setArtistArtworks] = useState([])
  const [isLoading, setIsLoading] = useState([])

  async function getArtist() {
    setIsLoading(true)
    try {
      const res = await getArtistData(id)
      setHomeArtist([res.data])
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  async function getArtistByArtwork() {
    setIsLoading(true)
    try {
      const res = await getArtistByArtworkData(id)
      setHomeArtist(res.data._embedded.artists)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  async function getArtistArtworks() {
    setIsLoading(true)
    try {
      const res = await getArtistArtworksData(id)
      setArtistArtworks(res.data._embedded.artworks)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  async function getArtistSimilarArtists() {
    setIsLoading(true)
    try {
      const res = await getArtistSimilarArtistsData(id)
      setSimilarArtists(res.data._embedded.artists)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  async function getArtistsGenes() {
    setIsLoading(true)
    try {
      const res = await getArtistGenesData(id)
      setArtistGenes(res.data._embedded.genes)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getArtist()
    getArtistArtworks()
    getArtistByArtwork()
    getArtistSimilarArtists()
    getArtistsGenes()
  }, [id])

  function goBack() {
    window.history.back()
  }

  function PageArtistContent() {
    if (isLoading) {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} width="60px" height="60px" />
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
                  <Icon
                    name="cancel"
                    style={{ opacity: '0.8' }}
                    fill={'#949494'}
                    height="30px"
                    width="30px"
                  />
                </CancelButtonContainer>
                <ImageCard
                  image={a._links.image.href.replace(
                    '{image_version}',
                    'large'
                  )}
                  style={{ backgroundImage: 'url(' + image + ')' }}
                />
                <BookmarkContainer onClick={() => onBookmark(id)}>
                  {bookmarked === true ? (
                    <Icon
                      fill={'#b8847d'}
                      name="heart_active"
                      height="30px"
                      width="30px"
                    />
                  ) : (
                    <Icon
                      fill={'#949494'}
                      name="heart"
                      height="30px"
                      width="30px"
                    />
                  )}
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
          <img alt="Roller" src={Roller} width="60px" height="60px" />
        </LoadingContainer>
      )
    }
  }

  function SearchContentArtworks() {
    if (isLoading) {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} width="60px" height="60px" />
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
          <img alt="Roller" src={Roller} width="60px" height="60px" />
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
          <img alt="Roller" src={Roller} width="60px" height="60px" />
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
