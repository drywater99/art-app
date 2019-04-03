import React, { useState, useEffect } from 'react'
import ThumbInstView from './ThumbInstView'
import ThumbSimArtwork from './ThumbSimArtwork'
import Roller from '../images/Roller.svg'
import {
  getSingleShowData,
  getShowImagesData,
  getShowArtworksData,
} from '../services'
import {
  PageGrid,
  ImageCard,
  CloseLink,
  BookmarkContainer,
  Bookmark,
  ExploreContainer,
  ExploreContainerX,
  SectionTitle,
  ContentDescription,
  ContentLink,
  ContentTitle,
  ContentSection,
  LoadingContainer,
} from './PageShowStyles'

export default function PageShow({ onBookmark, id }) {
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

  async function getShowArtworks() {
    setIsLoading(true)
    try {
      const res = await getShowArtworksData(id)
      setArtworks(res.data._embedded.artworks)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  async function getShowImages() {
    setIsLoading(true)
    try {
      const res = await getShowImagesData(id)
      setShowImages(res.data._embedded.images)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getSingleShow()
    getShowArtworks()
    getShowImages()
  }, [id])

  function goBack() {
    window.history.back()
  }

  function PageGeneContent() {
    if (isLoading) {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} width="60px" height="60px" />
        </LoadingContainer>
      )
    } else if (show.length > 0) {
      return (
        <React.Fragment>
          {show.map(s => {
            const image = s._links.image.href.replace(
              '{image_version}',
              'large'
            )
            return (
              <PageGrid key={s.id}>
                <CloseLink onClick={goBack}>x</CloseLink>
                <ImageCard
                  image={s._links.image.href.replace(
                    '{image_version}',
                    'large'
                  )}
                  style={{ backgroundImage: 'url(' + image + ')' }}
                />
                <BookmarkContainer>
                  <Bookmark
                    active={s.bookmarked}
                    onClick={() => onBookmark(s)}
                  />
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
          <img alt="Roller" src={Roller} width="60px" height="60px" />
        </LoadingContainer>
      )
    }
  }

  function RenderShowImages() {
    if (isLoading) {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} width="60px" height="60px" />
        </LoadingContainer>
      )
    } else if (showImages.length > 0) {
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
          <img alt="Roller" src={Roller} width="60px" height="60px" />
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
