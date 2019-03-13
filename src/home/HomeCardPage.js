import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import SimArtworksThumb from './SimArtworksThumb'

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
  background-size: 120%;
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

export default function HomeCardPage({ artwork, onBookmark }) {
  const [artists, setArtists] = useState([])
  const [artistsGene, setArtistsGene] = useState([])
  const [simArtworks, setSimArtworks] = useState([])

  function getRelatedArtists() {
    const urlString = artwork._links.artists.href

    axios
      .get(urlString, {
        headers: {
          'X-Xapp-Token':
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTU1MjQ5NTU2MiwiaWF0IjoxNTUxODkwNzYyLCJhdWQiOiI1YzdmZjk0OTI5MGViYTI4NGZjNzdhNTQiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWM3ZmY5NGEyOTBlYmE0OTE3NWUxZDlhIn0.xuujDMTwmKjPc16Gtjwri4PhdshtAEX5QHg32WtpmoQ',
        },
      })
      .then(res => {
        const results = res.data._embedded.artists
        setArtists(results)
      })
  }

  useEffect(() => {
    getRelatedArtists()
  }, [])

  console.log(artists)

  function getArtistsGene() {
    const urlString = artwork._links.genes.href

    axios
      .get(urlString, {
        headers: {
          'X-Xapp-Token':
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTU1MjQ5NTU2MiwiaWF0IjoxNTUxODkwNzYyLCJhdWQiOiI1YzdmZjk0OTI5MGViYTI4NGZjNzdhNTQiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWM3ZmY5NGEyOTBlYmE0OTE3NWUxZDlhIn0.xuujDMTwmKjPc16Gtjwri4PhdshtAEX5QHg32WtpmoQ',
        },
      })
      .then(res => {
        const results = res.data._embedded.genes
        setArtistsGene(results)
      })
  }

  useEffect(() => {
    getArtistsGene()
  }, [])

  console.log(artistsGene)

  function getSimilarArtworks() {
    const urlString = artwork._links.similar_artworks.href

    axios
      .get(urlString, {
        headers: {
          'X-Xapp-Token':
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTU1MjQ5NTU2MiwiaWF0IjoxNTUxODkwNzYyLCJhdWQiOiI1YzdmZjk0OTI5MGViYTI4NGZjNzdhNTQiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWM3ZmY5NGEyOTBlYmE0OTE3NWUxZDlhIn0.xuujDMTwmKjPc16Gtjwri4PhdshtAEX5QHg32WtpmoQ',
        },
      })
      .then(res => {
        const results = res.data._embedded.artworks
        setSimArtworks(results)
      })
  }

  useEffect(() => {
    getSimilarArtworks()
  }, [])

  console.log(simArtworks)

  const image = artwork._links.image.href.replace('{image_version}', 'large')

  function goBack() {
    window.history.back()
  }

  return (
    <PageGrid>
      <CloseLink onClick={goBack}>x</CloseLink>
      <ImageCard
        image={artwork._links.image.href.replace('{image_version}', 'large')}
        style={{ backgroundImage: 'url(' + image + ')' }}
      />
      <BookmarkContainer>
        <Bookmark
          active={artwork.bookmarked}
          onClick={() => onBookmark(artwork)}
        />
      </BookmarkContainer>
      <ContentContainer>
        {artists.map(artist => (
          <h3 key={artist.id}>{artist.name}</h3>
        ))}
        <p>{artwork.title}</p>
        <h3>{artwork.date}</h3>
        <small>{artwork.category}</small>
        <small>{artwork.medium}</small>
        <small>{artwork.dimensions.cm.text}</small>
        <small>{artwork.dimensions.in.text}</small>
        <br />
        <small>Location: {artwork.collecting_institution}</small>
        <br />
        {artistsGene.map(artistGene => (
          <small key={artistGene.id}>{artistGene.name}</small>
        ))}
        <div />
      </ContentContainer>
      <FullImage
        src={artwork._links.image.href.replace('{image_version}', 'larger')}
      />
      <ExploreContainer>
        <h3>Similar Artworks</h3>
        {simArtworks.map(simArtwork => (
          <SimArtworksThumb
            image={simArtwork._links.image.href.replace(
              '{image_version}',
              'square'
            )}
            name={simArtwork.name}
            key={simArtwork.id}
          />
        ))}
      </ExploreContainer>
    </PageGrid>
  )
}
