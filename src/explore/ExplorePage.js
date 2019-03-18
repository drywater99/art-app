import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import RelatedArtworksThumbs from '../gene/GeneThumbSimArtwork'
import RelatedGeneThumb from '../home/HomeThumbGene'

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

const ExploreContainerX = styled.section`
  display: grid;
  grid-auto-flow: column;
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  scroll-padding: 0 25px 0 25px;
  height: fit-content;
  padding: 25px;
`

export default function ExplorePage({ topic, onBookmark }) {
  const [artist, setArtist] = useState([])
  const [artistsGene, setArtistsGene] = useState([])
  const [simArtworks, setSimArtworks] = useState([])

  function getArtist() {
    const urlString = topic._links.artists.href

    axios
      .get(urlString, {
        headers: {
          'X-Xapp-Token':
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTU1MzEwMzE3NSwiaWF0IjoxNTUyNDk4Mzc1LCJhdWQiOiI1YzdmZjEyODZhZDY4NTc3ZTdiNTcwZjciLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWM4OTNlYzc4YjhkYTEyYjcwZWJlZjU0In0.GpApw2zXsP2EAZtJxgw7jYGE_RBlPmeb6D3OpdnOBu4',
        },
      })
      .then(res => {
        const results = res.data._embedded.artists
        setArtist(results)
      })
  }

  useEffect(() => {
    getArtist()
  }, [])

  console.log(artist)

  function getArtistsGene() {
    const urlString = topic._links.genes.href

    axios
      .get(urlString, {
        headers: {
          'X-Xapp-Token':
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTU1MzEwMzE3NSwiaWF0IjoxNTUyNDk4Mzc1LCJhdWQiOiI1YzdmZjEyODZhZDY4NTc3ZTdiNTcwZjciLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWM4OTNlYzc4YjhkYTEyYjcwZWJlZjU0In0.GpApw2zXsP2EAZtJxgw7jYGE_RBlPmeb6D3OpdnOBu4',
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
    const urlString = topic._links.similar_artworks.href

    axios
      .get(urlString, {
        headers: {
          'X-Xapp-Token':
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTU1MzEwMzE3NSwiaWF0IjoxNTUyNDk4Mzc1LCJhdWQiOiI1YzdmZjEyODZhZDY4NTc3ZTdiNTcwZjciLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWM4OTNlYzc4YjhkYTEyYjcwZWJlZjU0In0.GpApw2zXsP2EAZtJxgw7jYGE_RBlPmeb6D3OpdnOBu4',
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

  const image = topic._links.image.href.replace('{image_version}', 'large')

  function goBack() {
    window.history.back()
  }

  return (
    <PageGrid>
      <CloseLink onClick={goBack}>x</CloseLink>
      <ImageCard
        image={topic._links.image.href.replace('{image_version}', 'large')}
        style={{ backgroundImage: 'url(' + image + ')' }}
      />
      <BookmarkContainer>
        <Bookmark active={topic.bookmarked} onClick={() => onBookmark(topic)} />
      </BookmarkContainer>
      <ContentTitle>
        {' '}
        {artist.map(artist => (
          <h3 key={artist.id}>{artist.name}</h3>
        ))}
        <p>{topic.title}</p>
        <h3>{topic.date}</h3>
      </ContentTitle>
      <ContentContainer>
        <small>{topic.category}</small>
        <small>{topic.medium}</small>
        <small>{topic.dimensions.cm.text}</small>
        <small>{topic.dimensions.in.text}</small>
        <br />
        <small>Location: {topic.collecting_institution}</small>
        <br />
        {artistsGene.map(artistGene => (
          <small key={artistGene.id}>{artistGene.name}</small>
        ))}
        <div />
      </ContentContainer>
      <FullImage
        src={topic._links.image.href.replace('{image_version}', 'larger')}
      />
      <SectionTitle>
        <h3>Similar Artworks</h3>
      </SectionTitle>
      <ExploreContainerX>
        {simArtworks.map(simArtwork => (
          <RelatedArtworksThumbs
            image={simArtwork._links.image.href.replace(
              '{image_version}',
              'square'
            )}
            name={simArtwork.name}
            key={simArtwork.id}
          />
        ))}
      </ExploreContainerX>
      <SectionTitle>
        <h3>Related Categories</h3>
      </SectionTitle>
      <ExploreContainer>
        {artistsGene.map(artistsGene => (
          <RelatedGeneThumb
            image={artistsGene._links.image.href.replace(
              '{image_version}',
              'square500'
            )}
            name={artistsGene.name}
            key={artistsGene.id}
          />
        ))}
      </ExploreContainer>
    </PageGrid>
  )
}
