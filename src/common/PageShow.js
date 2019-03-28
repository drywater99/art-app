import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ThumbInstView from './ThumbInstView'
import ThumbSimArtwork from './ThumbSimArtwork'
import Roller from '../images/Roller.svg'
import {
  getSingleShowData,
  getShowImagesData,
  getShowArtworksData,
} from '../services'

const PageGrid = styled.section`
  display: grid;
  position: relative;
  width: 100vw;
  align-content: flex-start;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`

const ImageCard = styled.div`
  z-index: -1;
  height: 450px;
  width: 100vw;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 25px;
`

const CloseLink = styled.button`
  position: absolute;
  right: 25px;
  top: 25px;
  appearance: none;
  border: none;
  height: 20px;
  width: 20px;
  border-radius: 20px;
  line-height: -3;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.8);
  color: rgba(0, 0, 0, 0.8);
  text-align: center;
  cursor: pointer;
  opacity: 90;
  transition: all 0.4s ease-in-out, background 0.3s linear, color 0.3s linear;
  &.reverse {
    background: rgba(0, 0, 0, 0.8);
    color: rgba(255, 255, 255, 0.8);
  }
`

const BookmarkContainer = styled.section`
  display: flex;
  justify-content: flex-end;
  height: 30px;
  margin: 0 25px 0;
`

const Bookmark = styled.div`
  right: 30px;
  width: 20px;
  height: 10px;
  background: ${p => (p.active ? '#007aff' : '#383838')};
  transition: all 0.4s ease;
  &:after {
    transition: all 0.4s ease;
    display: block;
    content: '';
    border: 10px solid ${p => (p.active ? '#007aff' : '#383838')};
    border-bottom-color: transparent;
  }
`
const ExploreContainer = styled.section`
  display: grid;
  grid-template-columns: 150px 150px;
  grid-template-rows: auto;
  grid-column-gap: 21px;
  grid-row-gap: 21px;
  padding: 25px;
`

const ExploreContainerX = styled.section`
  display: grid;
  grid-auto-flow: column;
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  scroll-padding: 0 25px 0 25px;
  height: fit-content;
  padding: 25px;
`
const SectionTitle = styled.section`
  display: grid;
  align-content: flex-start;
  margin: 0 25px 0px 25px;
  padding: 25px 0 0 0;
  border-top: 1px solid #bababa;
`

const ContentDescription = styled.small`
  color: #949494;
  font-size: 16px;
  line-height: 1.4;
  margin: 0;
  padding: 0 25px 25px 25px;
  :first-line {
    color: #383838;
  }
`
const ContentLink = styled.small`
  color: #949494;
  font-size: 16px;
  line-height: 1.4;
  margin: 0;
  padding: 25px;
`

const ContentTitle = styled.section`
  display: grid;
  align-content: flex-start;
  padding: 0 25px 25px 25px;
`

const ContentSection = styled.section`
  display: grid;
  align-content: flex-start;
  padding: 0 0 25px 0;
  margin: 0 25px 0 25px;
  border-bottom: 1px solid #bababa;
`

const LoadingContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`

export default function PageShow({ onBookmark, id, props }) {
  const [show, setShow] = useState([])
  const [showImages, setShowImages] = useState([])
  const [artworks, setArtworks] = useState([])
  const [isLoading, setIsLoading] = useState()
  const [locationState, setLocationState] = useState(props.location)

  async function getSingleShow() {
    setIsLoading(true)
    await getSingleShowData(id)
      .then(res => {
        setShow([res.data])
      })
      .catch(err => console.log(err))
    setIsLoading(false)
  }
  useEffect(() => {
    setLocationState(props.location)
    getSingleShow()
  }, [locationState !== props.location])

  async function getShowArtworks() {
    setIsLoading(true)
    await getShowArtworksData(id)
      .then(res => {
        setArtworks(res.data._embedded.artworks)
      })
      .catch(err => console.log(err))
    setIsLoading(false)
  }
  useEffect(() => {
    setLocationState(props.location)
    getShowArtworks()
  }, [locationState !== props.location])

  async function getShowImages() {
    setIsLoading(true)
    await getShowImagesData(id)
      .then(res => {
        setShowImages(res.data._embedded.images)
      })
      .catch(err => console.log(err))
    setIsLoading(false)
  }
  useEffect(() => {
    setLocationState(props.location)
    getShowImages()
  }, [locationState !== props.location])

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
