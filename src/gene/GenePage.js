import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import GeneThumbSimArtist from './GeneThumbSimArtist'
import GeneThumbSimArtwork from './GeneThumbSimArtwork'

const PageGrid = styled.section`
  position: relative;
  display: grid;
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

export default function GenePage({ pageGene, onBookmark, id }) {
  const [pageGenes, setPageGenes] = useState([])
  const [relatedArtists, setRelatedArtists] = useState([])
  const [relatedArtworks, setRelatedArtworks] = useState([])

  function getGenes() {
    const urlString = `https://api.artsy.net/api/genes?artwork_id=${id}`

    axios
      .get(urlString, {
        headers: {
          'X-Xapp-Token':
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTU1MzEwMzE3NSwiaWF0IjoxNTUyNDk4Mzc1LCJhdWQiOiI1YzdmZjEyODZhZDY4NTc3ZTdiNTcwZjciLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWM4OTNlYzc4YjhkYTEyYjcwZWJlZjU0In0.GpApw2zXsP2EAZtJxgw7jYGE_RBlPmeb6D3OpdnOBu4',
        },
      })
      .then(res => {
        const results = res.data._embedded.genes
        setPageGenes(results)
      })
  }

  useEffect(() => {
    getGenes()
  }, [])

  console.log(pageGenes)

  function getRelatedArtists() {
    const urlString = `https://api.artsy.net/api/artists?gene_id=${id}`

    axios
      .get(urlString, {
        headers: {
          'X-Xapp-Token':
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTU1MzEwMzE3NSwiaWF0IjoxNTUyNDk4Mzc1LCJhdWQiOiI1YzdmZjEyODZhZDY4NTc3ZTdiNTcwZjciLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWM4OTNlYzc4YjhkYTEyYjcwZWJlZjU0In0.GpApw2zXsP2EAZtJxgw7jYGE_RBlPmeb6D3OpdnOBu4',
        },
      })
      .then(res => {
        const results = res.data._embedded.artists
        setRelatedArtists(results)
      })
  }

  useEffect(() => {
    getRelatedArtists()
  }, [])

  function getRelatedArtworks() {
    const urlString = `https://api.artsy.net/api/artworks?gene_id=${id}`

    axios
      .get(urlString, {
        headers: {
          'X-Xapp-Token':
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTU1MzEwMzE3NSwiaWF0IjoxNTUyNDk4Mzc1LCJhdWQiOiI1YzdmZjEyODZhZDY4NTc3ZTdiNTcwZjciLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWM4OTNlYzc4YjhkYTEyYjcwZWJlZjU0In0.GpApw2zXsP2EAZtJxgw7jYGE_RBlPmeb6D3OpdnOBu4',
        },
      })
      .then(res => {
        const results = res.data._embedded.artworks
        setRelatedArtworks(results)
      })
  }

  useEffect(() => {
    getRelatedArtworks()
  }, [])

  console.log(relatedArtists, relatedArtworks)

  function goBack() {
    window.history.back()
  }

  return (
    <PageGrid>
      {pageGenes.map(pageGene => {
        const image = pageGene._links.image.href.replace(
          '{image_version}',
          'square500'
        )
        return (
          <div key={pageGene.id}>
            <CloseLink onClick={goBack}>x</CloseLink>
            <ImageCard
              image={pageGene._links.image.href.replace(
                '{image_version}',
                'large'
              )}
              style={{ backgroundImage: 'url(' + image + ')' }}
            />
            <BookmarkContainer>
              <Bookmark
                active={pageGene.bookmarked}
                onClick={() => onBookmark(pageGene)}
              />
            </BookmarkContainer>
            <ContentTitle>
              <p>{pageGene.display_name || pageGene.name}</p>
            </ContentTitle>
            <ContentDescription>{pageGene.description}</ContentDescription>
            <SectionTitle>
              <h3>Related Artists</h3>
            </SectionTitle>
            <ExploreContainer>
              {relatedArtists.map(relatedArtist => (
                <GeneThumbSimArtist
                  image={relatedArtist._links.image.href.replace(
                    '{image_version}',
                    'square'
                  )}
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
                <GeneThumbSimArtwork
                  image={relatedArtwork._links.image.href.replace(
                    '{image_version}',
                    'square'
                  )}
                  name={relatedArtwork.name}
                  key={relatedArtwork.id}
                />
              ))}
            </ExploreContainerX>
          </div>
        )
      })}
    </PageGrid>
  )
}
