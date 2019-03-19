import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import SimGeneThumb from './SimGeneThumb'
import SimArtworkThumb from './SimArtworkThumb'
import {
  getArtworksData,
  getArtistByArtworkData,
  getSimilarArtworksToArtworkData,
  getArtworkGenesData,
} from '../services'

const PageGrid = styled.section`
  display: grid;
  position: relative;
  width: 100vw;
  align-content: flex-start;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`
const ContentContainer = styled.section`
  display: grid;
  align-content: flex-start;
  padding: 0 25px 25px 25px;
`

const ImageCard = styled.div`
  z-index: -1;
  height: 320px;
  width: 100%;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center top;
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

const FullImage = styled.img`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 0 25px 25px;
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
  padding: 0 25px 25px 25px;
`

const SectionTitle = styled.section`
  display: grid;
  align-content: flex-start;
  padding: 25px 25px 0px 25px;
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
  padding: 25px;
`

export default function ArtworkPage({ onBookmark, id }) {
  const [homeArtists, setHomeArtist] = useState([])
  const [artistGenes, setArtistsGene] = useState([])
  const [simArtworks, setSimArtworks] = useState([])
  const [pageArtworks, setPageArtworks] = useState([])

  async function getArtworks() {
    const urlString = `https://api.artsy.net/api/artworks/${id}`
    await getArtworksData(urlString).then(res => {
      setPageArtworks([res.data])
    })
  }

  useEffect(() => {
    getArtworks()
  }, [])

  async function getArtistByArtwork() {
    const urlString = `https://api.artsy.net/api/artists?artwork_id=${id}`
    await getArtistByArtworkData(urlString).then(res => {
      setHomeArtist(res.data._embedded.artists)
    })
  }

  useEffect(() => {
    getArtistByArtwork()
  }, [])

  async function getSimilarArtworksToArtwork() {
    const urlString = `https://api.artsy.net/api/artworks?similar_to_artwork_id=${id}`
    await getSimilarArtworksToArtworkData(urlString).then(res => {
      setSimArtworks(res.data._embedded.artworks)
    })
  }

  useEffect(() => {
    getSimilarArtworksToArtwork()
  }, [])

  async function getArtworkGenes() {
    const urlString = `https://api.artsy.net/api/genes?artwork_id=${id}`
    await getArtworkGenesData(urlString).then(res => {
      setArtistsGene(res.data._embedded.genes)
    })
  }

  useEffect(() => {
    getArtworkGenes()
  }, [])

  function goBack() {
    window.history.back()
  }

  return (
    <React.Fragment>
      {pageArtworks.map(pageArtwork => {
        const image = pageArtwork._links.image.href.replace(
          '{image_version}',
          'large'
        )
        return (
          <PageGrid key={pageArtwork.id}>
            <CloseLink onClick={goBack}>x</CloseLink>
            <ImageCard
              image={pageArtwork._links.image.href.replace(
                '{image_version}',
                'large'
              )}
              style={{ backgroundImage: 'url(' + image + ')' }}
            />
            <BookmarkContainer>
              <Bookmark
                active={pageArtwork.bookmarked}
                onClick={() => onBookmark(pageArtwork)}
              />
            </BookmarkContainer>
            <ContentTitle>
              {homeArtists.map(homeArtist => (
                <StyledLink to={`/artist/${id}`} key={homeArtist.id}>
                  <h3>{homeArtist.name} ❯</h3>
                </StyledLink>
              ))}
              <p>{pageArtwork.title}</p>
              <h3>{pageArtwork.date}</h3>
            </ContentTitle>
            <ContentContainer>
              <small>{pageArtwork.category}</small>
              <small>{pageArtwork.medium}</small>
              <small>{pageArtwork.dimensions.cm.text}</small>
              <small>{pageArtwork.dimensions.in.text}</small>
              <br />
              <small>Location: {pageArtwork.collecting_institution}</small>
              <br />
              {artistGenes.map(artistGene => (
                <small key={artistGene.id}>
                  {artistGene.display_name || artistGene.name}
                </small>
              ))}
              <div />
            </ContentContainer>
            <FullImage
              src={pageArtwork._links.image.href.replace(
                '{image_version}',
                'larger'
              )}
            />
            <SectionTitle>
              <h3>Similar Artworks</h3>
            </SectionTitle>
            <ExploreContainerX>
              {simArtworks.map(simArtwork => (
                <SimArtworkThumb
                  image={simArtwork._links.image.href.replace(
                    '{image_version}',
                    'large'
                  )}
                  id={simArtwork.id}
                  key={simArtwork.id}
                />
              ))}
            </ExploreContainerX>
            <SectionTitle>
              <h3>Related Categories</h3>
            </SectionTitle>
            <ExploreContainer>
              {artistGenes.map(artistGene => (
                <SimGeneThumb
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
          </PageGrid>
        )
      })}
    </React.Fragment>
  )
}
