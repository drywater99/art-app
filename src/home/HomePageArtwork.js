import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import HomeGeneThumb from './HomeThumbGene'
import HomeThumbSimArtwork from './HomeThumbSimArtwork'

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

export default function HomePageArtwork({
  artwork,
  pageArtwork,
  onBookmark,
  id,
  match,
}) {
  const [homeArtists, setHomeArtist] = useState([])
  const [artistsGene, setArtistsGene] = useState([])
  const [simArtworks, setSimArtworks] = useState([])
  const [pageArtworks, setPageArtworks] = useState([])

  async function getArtworks() {
    const urlString = `https://api.artsy.net/api/artworks/${id}`
    await axios
      .get(urlString, {
        headers: {
          'X-Xapp-Token':
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTU1MzEwMzE3NSwiaWF0IjoxNTUyNDk4Mzc1LCJhdWQiOiI1YzdmZjEyODZhZDY4NTc3ZTdiNTcwZjciLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWM4OTNlYzc4YjhkYTEyYjcwZWJlZjU0In0.GpApw2zXsP2EAZtJxgw7jYGE_RBlPmeb6D3OpdnOBu4',
        },
      })
      .then(res => {
        const results = res.data
        console.log(results)
        setPageArtworks([results])
      })
  }

  useEffect(() => {
    getArtworks()
  }, [])

  async function getArtist() {
    const urlString = `https://api.artsy.net/api/artists?artwork_id=${id}`
    console.log(urlString)
    await axios
      .get(urlString, {
        headers: {
          'X-Xapp-Token':
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTU1MzEwMzE3NSwiaWF0IjoxNTUyNDk4Mzc1LCJhdWQiOiI1YzdmZjEyODZhZDY4NTc3ZTdiNTcwZjciLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWM4OTNlYzc4YjhkYTEyYjcwZWJlZjU0In0.GpApw2zXsP2EAZtJxgw7jYGE_RBlPmeb6D3OpdnOBu4',
        },
      })
      .then(res => {
        const results = res.data._embedded.artists
        setHomeArtist(results)
      })
  }

  useEffect(() => {
    getArtist()
  }, [])

  // async function getArtistsGene() {
  //   const urlString = pageArtwork._links.genes.href
  //   await axios
  //     .get(urlString, {
  //       headers: {
  //         'X-Xapp-Token':
  //           'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTU1MzEwMzE3NSwiaWF0IjoxNTUyNDk4Mzc1LCJhdWQiOiI1YzdmZjEyODZhZDY4NTc3ZTdiNTcwZjciLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWM4OTNlYzc4YjhkYTEyYjcwZWJlZjU0In0.GpApw2zXsP2EAZtJxgw7jYGE_RBlPmeb6D3OpdnOBu4',
  //       },
  //     })
  //     .then(res => {
  //       const results = res.data._embedded.genes
  //       setArtistsGene(results)
  //     })
  // }

  // useEffect(() => {
  //   getArtistsGene()
  // }, [])

  // console.log(pageArtworks)

  // async function getSimilarArtworks() {
  //   const urlString = pageArtwork._links.similar_artworks.href
  //   await axios
  //     .get(urlString, {
  //       headers: {
  //         'X-Xapp-Token':
  //           'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTU1MzEwMzE3NSwiaWF0IjoxNTUyNDk4Mzc1LCJhdWQiOiI1YzdmZjEyODZhZDY4NTc3ZTdiNTcwZjciLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWM4OTNlYzc4YjhkYTEyYjcwZWJlZjU0In0.GpApw2zXsP2EAZtJxgw7jYGE_RBlPmeb6D3OpdnOBu4',
  //       },
  //     })
  //     .then(res => {
  //       const results = res.data._embedded.artworks
  //       setSimArtworks(results)
  //     })
  // }

  // useEffect(() => {
  //   getSimilarArtworks()
  // }, [])

  // console.log(simArtworks)

  function goBack() {
    window.history.back()
  }

  console.log(pageArtworks, homeArtists)

  return (
    <PageGrid>
      {pageArtworks.map(pageArtwork => {
        const image = pageArtwork._links.image.href.replace(
          '{image_version}',
          'large'
        )
        return (
          <div key={pageArtwork.id}>
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
                <h3 key={homeArtist.id}>{homeArtist.name}</h3>
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
              {artistsGene.map(artistGene => (
                <small key={artistGene.id}>{artistGene.name}</small>
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
                <HomeThumbSimArtwork
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
                <HomeGeneThumb
                  image={artistsGene._links.image.href.replace(
                    '{image_version}',
                    'square500'
                  )}
                  name={artistsGene.name}
                  key={artistsGene.id}
                />
              ))}
            </ExploreContainer>
          </div>
        )
      })}
    </PageGrid>
  )
}
