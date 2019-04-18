import React, { useState, useEffect } from 'react'
import ThumbInstView from './ThumbInstView'
import ThumbSimArtwork from './ThumbSimArtwork'
import Roller from '../images/Roller.svg'
import Icon from '../app/Icon'
import {
  getSingleShowData,
  getShowImagesData,
  getShowArtworksData,
} from '../services'
import {
  PageGrid,
  ImageCard,
  CancelButtonContainer,
  BookmarkContainer,
  ExploreContainer,
  ExploreContainerX,
  SectionTitle,
  ContentDescription,
  ContentLink,
  ContentTitle,
  ContentSection,
  LoadingContainer,
} from './PageShowStyles'

export default function PageShow({ onBookmark, bookmarked, id }) {
  const [show, setShow] = useState([])
  const [showImages, setShowImages] = useState([])
  const [artworks, setArtworks] = useState([])
  const [isLoading, setIsLoading] = useState()

  async function getSingleShow() {
    setIsLoading(true)
    try {
      const res = await getSingleShowData(id)
      setShow([res.data])
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

  async function getShowArtworks() {
    getData(getShowArtworksData, setArtworks, 'artworks')
  }

  async function getShowImages() {
    getData(getShowImagesData, setShowImages, 'images')
  }

  useEffect(() => {
    getSingleShow()
    getShowArtworks()
    getShowImages()
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

  function PageGeneContent() {
    if (isLoading) {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} />
        </LoadingContainer>
      )
    } else if (show.length) {
      return (
        <React.Fragment>
          {show.map(s => {
            const image = s._links.image.href.replace(
              '{image_version}',
              'large'
            )
            return (
              <PageGrid key={s.id}>
                <CancelButtonContainer onClick={goBack}>
                  <Icon name="cancel" />
                </CancelButtonContainer>
                <ImageCard
                  image={s._links.image.href.replace(
                    '{image_version}',
                    'large'
                  )}
                  style={{ backgroundImage: 'url(' + image + ')' }}
                />
                <BookmarkContainer onClick={() => onBookmark(s)}>
                  {renderBookmark(bookmarked)}
                </BookmarkContainer>
                <ContentTitle>
                  <p>{s.name}</p>
                </ContentTitle>
                <ContentDescription>{s.description}</ContentDescription>
                {s.press_release && (
                  <ContentDescription>{s.press_release}</ContentDescription>
                )}
                <ContentSection>
                  <small>
                    {s.start_at}-{s.end_at}
                  </small>
                </ContentSection>
                {s._links.permalink.href && (
                  <ContentLink>{s._links.permalink.href}</ContentLink>
                )}
                <RenderShowImages />
                <RenderShowArtworks />
              </PageGrid>
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

  function RenderShowImages() {
    if (isLoading) {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} />
        </LoadingContainer>
      )
    } else if (showImages.length) {
      return (
        <React.Fragment>
          <ExploreContainerX>
            {showImages.map(image => (
              <ThumbInstView
                image={image._links.image.href.replace(
                  '{image_version}',
                  'square'
                )}
                key={image.id}
              />
            ))}
          </ExploreContainerX>
        </React.Fragment>
      )
    } else {
      return null
    }
  }

  function RenderShowArtworks() {
    if (isLoading) {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} />
        </LoadingContainer>
      )
    } else if (artworks.length > 0) {
      return (
        <React.Fragment>
          <SectionTitle>
            <h3>Exhibition Artworks</h3>
          </SectionTitle>
          <ExploreContainer>
            {artworks.map(artwork => (
              <ThumbSimArtwork
                image={artwork._links.image.href.replace(
                  '{image_version}',
                  'square'
                )}
                id={artwork.id}
                name={artwork.name}
                key={artwork.id}
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
