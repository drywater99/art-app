import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import RelatedArtistsThumbs from './RelatedArtistsThumb'
import RelatedArtworksThumbs from './RelatedArtworksThumb'

const PageGrid = styled.section`
  position: relative;
  display: grid;
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
  grid-row-gap: 18px;
  padding: 25px;
`
const ContentTitle = styled.section`
  display: grid;
  align-content: flex-start;
  padding: 25px 25px 0px 25px;
`

export default function GeneThumbPage({ gene, onBookmark }) {
  const [relatedArtists, setRelatedArtists] = useState([])
  const [relatedArtworks, setRelatedArtworks] = useState([])

  function getRelatedArtists() {
    const urlString = gene._links.artists.href

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
    const urlString = gene._links.artworks.href

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

  const image = gene._links.image.href.replace('{image_version}', 'square500')

  function goBack() {
    window.history.back()
  }

  return (
    <PageGrid>
      <CloseLink onClick={goBack}>x</CloseLink>
      <ImageCard
        image={gene._links.image.href.replace('{image_version}', 'large')}
        style={{ backgroundImage: 'url(' + image + ')' }}
      />
      <BookmarkContainer>
        <Bookmark active={gene.bookmarked} onClick={() => onBookmark(gene)} />
      </BookmarkContainer>
      <ContentContainer>
        <p>{gene.display_name || gene.name}</p>
        <small>{gene.description}</small>
      </ContentContainer>
      <ContentTitle>
        <p>Related Artists</p>
      </ContentTitle>
      <ExploreContainer>
        {relatedArtists.map(relatedArtist => (
          <RelatedArtistsThumbs
            image={relatedArtist._links.image.href.replace(
              '{image_version}',
              'square'
            )}
            name={relatedArtist.name}
            key={relatedArtist.id}
          />
        ))}
      </ExploreContainer>
      <ContentTitle>
        <p>Related Artworks</p>
      </ContentTitle>
      <ExploreContainer>
        {relatedArtworks.map(relatedArtwork => (
          <RelatedArtworksThumbs
            image={relatedArtwork._links.image.href.replace(
              '{image_version}',
              'square'
            )}
            name={relatedArtwork.name}
            key={relatedArtwork.id}
          />
        ))}
      </ExploreContainer>
    </PageGrid>
  )
}
