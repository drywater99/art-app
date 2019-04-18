import React, { useState, useEffect } from 'react'
import ThumbSimArtist from './ThumbSimArtist'
import ThumbSimArtwork from './ThumbSimArtwork'
import Roller from '../images/Roller.svg'
import Icon from './Icon'
import {
  getGenesData,
  getGenesRelatedArtistsData,
  getGeneRelatedArtworksData,
} from '../services'
import {
  PageGridGene,
  ImageCard,
  CancelButtonContainer,
  ExploreContainer,
  ExploreContainerX,
  SectionTitle,
  ContentDescription,
  ContentTitleGene,
  LoadingContainer,
} from './PageStyles'

export default function PageGene({ id }) {
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

  async function getGeneRelatedArtists() {
    getData(getGenesRelatedArtistsData, setRelatedArtists, 'artists')
  }

  async function getGeneRelatedArtworks() {
    getData(getGeneRelatedArtworksData, setRelatedArtworks, 'artworks')
  }

  useEffect(() => {
    getGene()
    getGeneRelatedArtists()
    getGeneRelatedArtworks()
  }, [id])

  function goBack() {
    window.history.back()
  }

  function PageGeneContent() {
    if (isLoading) {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} />
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
              <PageGridGene key={g.id}>
                <CancelButtonContainer onClick={goBack}>
                  <Icon name="cancel" />
                </CancelButtonContainer>
                <ImageCard
                  image={g._links.image.href.replace(
                    '{image_version}',
                    'large'
                  )}
                  style={{ backgroundImage: 'url(' + image + ')' }}
                />
                <ContentTitleGene>
                  <p>{g.display_name || g.name}</p>
                </ContentTitleGene>
                <ContentDescription>{g.description}</ContentDescription>
                <SearchContentSimArtists />
                <SearchContentSimArtworks />
              </PageGridGene>
            )
          })}
        </React.Fragment>
      )
    } else {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} />
        </LoadingContainer>
      )
    }
  }

  function SearchContentSimArtists() {
    if (isLoading) {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} />
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
          <img alt="Roller" src={Roller} />
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

  return <PageGeneContent />
}
