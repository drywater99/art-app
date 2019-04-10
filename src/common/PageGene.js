import React, { useState, useEffect } from 'react'
import ThumbSimArtist from './ThumbSimArtist'
import ThumbSimArtwork from './ThumbSimArtwork'
import Roller from '../images/Roller.svg'
import Icon from '../app/Icon'
import {
  getGenesData,
  getGenesRelatedArtistsData,
  getGeneRelatedArtworksData,
} from '../services'
import {
  PageGrid,
  ImageCard,
  CancelButtonContainer,
  BookmarkContainer,
  Bookmark,
  ExploreContainer,
  ExploreContainerX,
  SectionTitle,
  ContentDescription,
  ContentTitle,
  LoadingContainer,
} from './PageGeneStyles'

export default function PageGene({ onBookmark, bookmarked, id }) {
  const [gene, setGene] = useState([])
  const [relatedArtists, setRelatedArtists] = useState([])
  const [relatedArtworks, setRelatedArtworks] = useState([])
  const [isLoading, setIsLoading] = useState()

  async function getGene() {
    setIsLoading(true)
    try {
      const res = await getGenesData(id)
      setGene([res.data])
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  async function getGeneRelatedArtists() {
    setIsLoading(true)
    try {
      const res = await getGenesRelatedArtistsData(id)
      setRelatedArtists(res.data._embedded.artists)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  async function getGeneRelatedArtworks() {
    setIsLoading(true)
    try {
      const res = await getGeneRelatedArtworksData(id)
      setRelatedArtworks(res.data._embedded.artworks)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getGene()
    getGeneRelatedArtists()
    getGeneRelatedArtworks()
  }, [id])

  function goBack() {
    window.history.back()
  }

  function SearchContentSimArtists() {
    if (isLoading) {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} width="60px" height="60px" />
        </LoadingContainer>
      )
    } else if (relatedArtworks.length > 0) {
      return (
        <React.Fragment>
          <SectionTitle>
            <h3>Related Artworks</h3>
          </SectionTitle>
          <ExploreContainerX>
            {relatedArtworks.map(relatedArtwork => (
              <ThumbSimArtwork
                image={relatedArtwork._links.image.href.replace(
                  '{image_version}',
                  'large'
                )}
                key={relatedArtwork.id}
                id={relatedArtwork.id}
              />
            ))}
          </ExploreContainerX>
        </React.Fragment>
      )
    } else {
      return null
    }
  }

  function SearchContentSimArtworks() {
    if (isLoading) {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} width="60px" height="60px" />
        </LoadingContainer>
      )
    } else if (relatedArtists.length > 0) {
      return (
        <React.Fragment>
          <SectionTitle>
            <h3>Related Artists</h3>
          </SectionTitle>
          <ExploreContainer>
            {relatedArtists.map(relatedArtist => (
              <ThumbSimArtist
                image={relatedArtist._links.image.href.replace(
                  '{image_version}',
                  'square'
                )}
                id={relatedArtist.id}
                name={relatedArtist.name}
                key={relatedArtist.id}
              />
            ))}
          </ExploreContainer>
        </React.Fragment>
      )
    } else {
      return null
    }
  }

  function PageGeneContent() {
    if (isLoading) {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} width="60px" height="60px" />
        </LoadingContainer>
      )
    } else if (gene.length > 0) {
      return (
        <React.Fragment>
          {gene.map(g => {
            const image = g._links.image.href.replace(
              '{image_version}',
              'square500'
            )
            return (
              <PageGrid key={g.id}>
                <CancelButtonContainer onClick={goBack}>
                  {' '}
                  <Icon
                    name="cancel"
                    style={{ opacity: '0.8' }}
                    fill={'#949494'}
                    height="30px"
                    width="30px"
                  />
                </CancelButtonContainer>
                <ImageCard
                  image={g._links.image.href.replace(
                    '{image_version}',
                    'large'
                  )}
                  style={{ backgroundImage: 'url(' + image + ')' }}
                />
                <BookmarkContainer onClick={() => onBookmark(g)}>
                {bookmarked === true ? <Icon
                  fill={ '#b8847d'}
                  name="heart_active"
                  height="30px"
                  width="30px"
                  /> : <Icon
                  fill={ '#949494'}
                  name="heart"
                  height="30px"
                  width="30px"
                  />}
                </BookmarkContainer>
                <ContentTitle>
                  <p>{g.display_name || g.name}</p>
                </ContentTitle>
                <ContentDescription>{g.description}</ContentDescription>
                <SearchContentSimArtists />
                <SearchContentSimArtworks />
              </PageGrid>
            )
          })}
        </React.Fragment>
      )
    } else {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} width="60px" height="60px" />
        </LoadingContainer>
      )
    }
  }

  return <PageGeneContent />
}
