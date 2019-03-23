import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  getArtistData,
  getArtistByArtworkData,
  getArtistGenesData,
  getArtistSimilarArtistsData,
  getArtistArtworksData,
} from '../services'
import ThumbSimGeneX from './ThumbSimGeneX'
import ThumbArtwork from './ThumbArtwork'
import ThumbSimArtistX from './ThumbSimArtistX'

const PageGrid = styled.section`
  position: relative;
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
  height: 450px;
  width: 100vw;
  background-size: cover;
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

// const StyledLink = styled(Link)`
//   text-decoration: none;
// `

export default function ArtistPage({ onBookmark, id }) {
  const [homeArtists, setHomeArtist] = useState([])
  const [artistGenes, setArtistGenes] = useState([])
  const [similarArtists, setSimilarArtists] = useState([])
  const [artistArtworks, setArtistArtworks] = useState([])

  async function getArtist() {
    await getArtistData(id).then(res => {
      setHomeArtist([res.data])
    })
  }

  useEffect(() => {
    getArtist()
  }, [])

  async function getArtistByArtwork() {
    await getArtistByArtworkData(id).then(res => {
      const results = res.data._embedded.artists
      setHomeArtist(results)
    })
  }

  useEffect(() => {
    getArtistByArtwork()
  }, [])

  async function getArtistArtworks() {
    await getArtistArtworksData(id).then(res => {
      const results = res.data._embedded.artworks
      setArtistArtworks(results)
    })
  }

  useEffect(() => {
    getArtistArtworks()
  }, [])

  async function getArtistSimilarArtists() {
    await getArtistSimilarArtistsData(id).then(res => {
      const results = res.data._embedded.artists
      setSimilarArtists(results)
    })
  }
  useEffect(() => {
    getArtistSimilarArtists()
  }, [])

  async function getArtistsGenes() {
    await getArtistGenesData(id).then(res => {
      const results = res.data._embedded.genes
      setArtistGenes(results)
    })
  }

  useEffect(() => {
    getArtistsGenes()
  }, [])

  function goBack() {
    window.history.back()
  }

  console.log(artistArtworks)

  return (
    <PageGrid>
      {homeArtists.map(homeArtist => {
        const image = homeArtist._links.image.href.replace(
          '{image_version}',
          'large'
        )
        return (
          <div key={homeArtist.id}>
            <CloseLink onClick={goBack}>x</CloseLink>
            <ImageCard
              image={homeArtist._links.image.href.replace(
                '{image_version}',
                'large'
              )}
              style={{ backgroundImage: 'url(' + image + ')' }}
            />
            <BookmarkContainer>
              <Bookmark
                active={homeArtist.bookmarked}
                onClick={() => onBookmark(homeArtist)}
              />
            </BookmarkContainer>
            <ContentTitle>
              <p>{homeArtist.name}</p>
            </ContentTitle>
            <ContentContainer>
              <small>{homeArtist.nationality}</small>
              <br />
              <small>
                {homeArtist.birthday}-{homeArtist.deathday}
              </small>
              <br />
              <small>{homeArtist.hometown}</small>
              <br />
              <div />
            </ContentContainer>

            <SectionTitle>
              <h3>Related Categories</h3>
            </SectionTitle>
            <ExploreContainerX>
              {artistGenes.map(artistGene => (
                <ThumbSimGeneX
                  image={artistGene._links.image.href.replace(
                    '{image_version}',
                    'square500'
                  )}
                  name={artistGene.name}
                  key={artistGene.id}
                  id={artistGene.id}
                />
              ))}
            </ExploreContainerX>
            <SectionTitle>
              <h3>Similar Artists</h3>
            </SectionTitle>
            <ExploreContainerX>
              {similarArtists.map(similarArtists => (
                <ThumbSimArtistX
                  image={similarArtists._links.image.href.replace(
                    '{image_version}',
                    'square'
                  )}
                  name={similarArtists.name}
                  key={similarArtists.id}
                  id={similarArtists.id}
                />
              ))}
            </ExploreContainerX>
            <SectionTitle>
              <h3>Artworks</h3>
            </SectionTitle>
            <ExploreContainer>
              {artistArtworks.map(artistArtwork => (
                <ThumbArtwork
                  image={artistArtwork._links.image.href.replace(
                    '{image_version}',
                    'medium'
                  )}
                  title={artistArtwork.title}
                  date={artistArtwork.date}
                  key={artistArtwork.id}
                  id={artistArtwork.id}
                />
              ))}
            </ExploreContainer>
          </div>
        )
      })}
    </PageGrid>
  )
}
