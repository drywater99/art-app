import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ThumbSimArtist from './ThumbSimArtist'
import ThumbSimArtwork from './ThumbSimArtwork'
import {
  getGenesData,
  getGenesRelatedArtistsData,
  getGeneRelatedArtworksData,
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
  height: 320px;
  width: 100%;
  background-size: 110%;
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
  padding: 25px 25px 0 25px;
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

const ContentTitle = styled.section`
  display: grid;
  align-content: flex-start;
  padding: 0 25px 25px 25px;
`

export default function PageGene({ onBookmark, id }) {
  const [gene, setGene] = useState([])
  const [relatedArtists, setRelatedArtists] = useState([])
  const [relatedArtworks, setRelatedArtworks] = useState([])
  const [isLoading, setIsLoading] = useState()

  async function getGenes() {
    setIsLoading(true)
    await getGenesData(id).then(res => {
      setGene([res.data])
    })
    setIsLoading(false)
  }
  useEffect(() => {
    getGenes()
  }, [])

  async function getGeneRelatedArtists() {
    await getGenesRelatedArtistsData(id).then(res => {
      setRelatedArtists(res.data._embedded.artists)
    })
  }
  useEffect(() => {
    getGeneRelatedArtists()
  }, [])

  async function getGeneRelatedArtworks() {
    await getGeneRelatedArtworksData(id).then(res => {
      setRelatedArtworks(res.data._embedded.artworks)
    })
  }
  useEffect(() => {
    getGeneRelatedArtworks()
  }, [])

  function goBack() {
    window.history.back()
  }

  let PageGeneContent
  if (isLoading) {
    PageGeneContent = 'Loading'
  } else {
    PageGeneContent = (
      <React.Fragment>
        {gene.map(g => {
          const image = g._links.image.href.replace(
            '{image_version}',
            'square500'
          )
          return (
            <PageGrid key={g.id}>
              <CloseLink onClick={goBack}>x</CloseLink>
              <ImageCard
                image={g._links.image.href.replace('{image_version}', 'large')}
                style={{ backgroundImage: 'url(' + image + ')' }}
              />
              <BookmarkContainer>
                <Bookmark active={g.bookmarked} onClick={() => onBookmark(g)} />
              </BookmarkContainer>
              <ContentTitle>
                <p>{g.display_name || g.name}</p>
              </ContentTitle>
              <ContentDescription>{g.description}</ContentDescription>
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
            </PageGrid>
          )
        })}
      </React.Fragment>
    )
  }

  return <React.Fragment>{PageGeneContent}</React.Fragment>
}
