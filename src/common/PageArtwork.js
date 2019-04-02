import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ThumbSimGene from './ThumbSimGene'
import ThumbSimArtwork from './ThumbSimArtwork'
import Roller from '../images/Roller.svg'
import {
  getArtworkData,
  getArtistByArtworkData,
  getSimilarArtworksToArtworkData,
  getArtworkGenesData,
} from '../services'

const PageGrid = styled.section`
  position: relative;
  align-content: flex-start;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`

const ContentContainer = styled.section`
  display: grid;
  align-content: flex-start;
  margin: 25px 25px 0 25px;
  padding: 0 0 25px 0;
  border-bottom: 1px solid #bababa;
`

const ImageCard = styled.div`
  z-index: -1;
  height: 450px;
  width: 100vw;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  margin-bottom: 20px;
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
  height: 20px;
  margin: 0 25px 0;
`

const Bookmark = styled.div`
  right: 30px;
  width: 20px;
  height: 10px;
  background: ${p => (p.active ? '#b8847d' : '#383838')};
  transition: all 0.4s ease;
  &:after {
    transition: all 0.4s ease;
    display: block;
    content: '';
    border: 10px solid ${p => (p.active ? '#b8847d' : '#383838')};
    border-bottom-color: transparent;
  }
`

const FullImage = styled.img`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 30px 25px 30px 25px;
  width: 100%;
  .fill {
    object-fit: fill;
  }
`

const ExploreContainer = styled.section`
  display: grid;
  grid-template-columns: 150px 150px;
  grid-template-rows: auto;
  grid-column-gap: 21px;
  grid-row-gap: 18px;
  padding: 25px;
`

const ContentTitle = styled.section`
  display: grid;
  align-content: flex-start;
  margin: 10px 25px 0px 25px;
  padding: 0 0 25px 0;
  border-bottom: 1px solid #bababa;
`

const SectionTitle = styled.section`
  display: grid;
  align-content: flex-start;
  margin: 0 25px 0px 25px;
  padding: 25px 0 0 0;
  border-top: 1px solid #bababa;
`

const StyledLink = styled(Link)`
  text-decoration: none;
`

const ExploreContainerX = styled.section`
  display: grid;
  grid-auto-flow: column;
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  scroll-padding: 0 25px 0 25px;
  height: fit-content;
  padding: 25px 25px 30px 25px;
`
const LoadingContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`
PageArtwork.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  bookmarked: PropTypes.bool,
  onBookmark: PropTypes.func,
}

PageArtwork.defaultProps = {
  title: 'No title defined',
  content: 'No content defined',
  bookmarked: false,
}

export default function PageArtwork({ onBookmark, bookmarked, id }) {
  const [pageArtwork, setPageArtwork] = useState([])
  const [artworkArtist, setArtworkArtist] = useState([])
  const [artworkGenes, setArtworkGenes] = useState([])
  const [simArtworks, setSimArtworks] = useState([])
  const [isLoading, setIsLoading] = useState()

  async function getArtwork() {
    setIsLoading(true)
    try {
      const res = await getArtworkData(id)
      setPageArtwork([res.data])
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  async function getArtistByArtwork() {
    setIsLoading(true)
    try {
      const res = await getArtistByArtworkData(id)
      setArtworkArtist(res.data._embedded.artists)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  async function getSimilarArtworksToArtwork() {
    setIsLoading(true)
    try {
      const res = await getSimilarArtworksToArtworkData(id)
      setSimArtworks(res.data._embedded.artworks)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  async function getArtworkGenes() {
    setIsLoading(true)
    try {
      const res = await getArtworkGenesData(id)
      setArtworkGenes(res.data._embedded.genes)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getArtwork()
    getArtistByArtwork()
    getSimilarArtworksToArtwork()
    getArtworkGenes()
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
    } else if (pageArtwork.length > 0) {
      return (
        <React.Fragment>
          {pageArtwork.map(a => {
            const image = a._links.image.href.replace(
              '{image_version}',
              'large'
            )
            return (
              <PageGrid key={a.id}>
                <CloseLink onClick={goBack}>x</CloseLink>
                <ImageCard style={{ backgroundImage: 'url(' + image + ')' }} />
                <BookmarkContainer>
                  {onBookmark && (
                    <Bookmark
                      active={bookmarked === true}
                      onClick={() => onBookmark(id)}
                    />
                  )}
                </BookmarkContainer>
                <ContentTitle>
                  {artworkArtist.map(homeArtist => (
                    <StyledLink
                      to={`/artist/${homeArtist.id}`}
                      key={homeArtist.id}
                    >
                      <h3>{homeArtist.name} ❯</h3>
                    </StyledLink>
                  ))}
                  <p>{a.title}</p>
                  <h3>{a.date}</h3>
                </ContentTitle>
                <ContentContainer>
                  <small>{a.category}</small>
                  <small>{a.medium}</small>
                  <small>{a.dimensions.cm.text}</small>
                  <small>{a.dimensions.in.text}</small>
                </ContentContainer>
                <ContentContainer>
                  <h3>Location</h3>
                  <br />
                  <small>{a.collecting_institution}</small>
                </ContentContainer>
                {artworkGenes ? (
                  <ContentContainer>
                    <h3>Categories</h3> <br />
                    {artworkGenes.map(artworkGene => (
                      <small key={artworkGene.id}>
                        {artworkGene.display_name || artworkGene.name}
                      </small>
                    ))}
                  </ContentContainer>
                ) : null}
                <FullImage
                  src={a._links.image.href.replace('{image_version}', 'larger')}
                />
                <SearchContentSimArtworks />
                <SearchContentSimCategories />
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

  function SearchContentSimArtworks() {
    if (isLoading) {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} width="60px" height="60px" />
        </LoadingContainer>
      )
    } else if (simArtworks.length > 0) {
      return (
        <React.Fragment>
          <SectionTitle>
            <h2>Similar Artworks</h2>
          </SectionTitle>
          <ExploreContainerX>
            {simArtworks.map(simArtwork => (
              <ThumbSimArtwork
                image={simArtwork._links.image.href.replace(
                  '{image_version}',
                  'large'
                )}
                id={simArtwork.id}
                key={simArtwork.id}
              />
            ))}
          </ExploreContainerX>
        </React.Fragment>
      )
    } else {
      return null
    }
  }

  function SearchContentSimCategories() {
    if (isLoading) {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} width="60px" height="60px" />
        </LoadingContainer>
      )
    } else if (artworkGenes.length > 0) {
      return (
        <React.Fragment>
          <SectionTitle>
            <h2>Related Categories</h2>
          </SectionTitle>
          <ExploreContainer>
            {artworkGenes.map(artistGene => (
              <ThumbSimGene
                image={artistGene._links.image.href.replace(
                  '{image_version}',
                  'square500'
                )}
                id={artistGene.id}
                name={artistGene.name}
                display_name={artistGene.display_name}
                key={artistGene.id}
              />
            ))}
          </ExploreContainer>
        </React.Fragment>
      )
    } else {
      return null
    }
  }

  return (
    <React.Fragment>
      <PageGeneContent />
    </React.Fragment>
  )
}
