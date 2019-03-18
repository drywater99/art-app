import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
// import HomeGeneThumb from './HomeThumbGene'
// import HomeThumbSimArtwork from './HomeThumbSimArtwork'

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
  background-size: 140%;
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

// const FullImage = styled.img`
//   display: flex;
//   flex-direction: column;
//   flex-wrap: wrap;
//   align-items: flex-start;
//   padding: 0 25px 25px;
//   width: 100%;
//   .fill {
//     object-fit: fill;
//   }
// `

// const ExploreContainer = styled.section`
//   display: grid;
//   grid-template-columns: 150px 150px;
//   grid-template-rows: auto;
//   grid-column-gap: 21px;
//   grid-row-gap: 18px;
//   padding: 25px;
// `

const ContentTitle = styled.section`
  display: grid;
  align-content: flex-start;
  padding: 0 25px 25px 25px;
`

// const SectionTitle = styled.section`
//   display: grid;
//   align-content: flex-start;
//   padding: 25px 25px 0px 25px;
// `

// const ExploreContainerX = styled.section`
//   display: grid;
//   grid-auto-flow: column;
//   scroll-snap-type: x mandatory;
//   overflow-x: scroll;
//   scroll-padding: 0 25px 0 25px;
//   height: fit-content;
//   padding: 25px;
// `

// const StyledLink = styled(Link)`
//   text-decoration: none;
// `

export default function HomePageArtwork({
  artwork,
  homeArtist,
  onBookmark,
  id,
  match,
}) {
  const [homeArtists, setHomeArtist] = useState([])
  // const [artistsGene, setArtistsGene] = useState([])
  // const [simArtworks, setSimArtworks] = useState([])
  // const [pageArtworks, setPageArtworks] = useState([])

  // async function getArtworks() {
  //   const urlString = `https://api.artsy.net/api/artworks/${id}`
  //   await axios
  //     .get(urlString, {
  //       headers: {
  //         'X-Xapp-Token':
  //           'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTU1MzEwMzE3NSwiaWF0IjoxNTUyNDk4Mzc1LCJhdWQiOiI1YzdmZjEyODZhZDY4NTc3ZTdiNTcwZjciLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWM4OTNlYzc4YjhkYTEyYjcwZWJlZjU0In0.GpApw2zXsP2EAZtJxgw7jYGE_RBlPmeb6D3OpdnOBu4',
  //       },
  //     })
  //     .then(res => {
  //       const results = res.data
  //       console.log(results)
  //       setPageArtworks([results])
  //     })
  // }

  // useEffect(() => {
  //   getArtworks()
  // }, [])

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

  // async function getSimilarArtworks() {
  //   const urlString = `https://api.artsy.net/api/artworks?similar_to_artwork_id=${id}`
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

  // async function getArtistsGene() {
  //   const urlString = `https://api.artsy.net/api/genes?artwork_id=${id}`
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

  function goBack() {
    window.history.back()
  }

  console.log(homeArtists)

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
              {/* {homeArtists.map(homeArtist => (
                <StyledLink to={`/artist/${id}`} key={homeArtist.id}>
                  <h3>{homeArtist.name}</h3>
                </StyledLink>
              ))} */}
              <p>{homeArtist.name}</p>
            </ContentTitle>
            <ContentContainer>
              <small>{homeArtist.birthday}</small>
              <small>{homeArtist.deathday}</small>
              <br />
              <small>{homeArtist.hometown}</small>
              <br />
              {/* {artistsGene.map(artistGene => (
                <small key={artistGene.id}>{artistGene.name}</small>
              ))} */}
              <div />
            </ContentContainer>
            {/* <FullImage
              src={homeArtist._links.image.href.replace(
                '{image_version}',
                'larger'
              )}
            /> */}
            {/* <SectionTitle>
              <h3>Similar Artworks</h3>
            </SectionTitle>
            <ExploreContainerX>
              {simArtworks.map(simArtwork => (
                <HomeThumbSimArtwork
                  image={simArtwork._links.image.href.replace(
                    '{image_version}',
                    'small'
                  )}
                  name={simArtwork.name}
                  key={simArtwork.id}
                />
              ))}
            </ExploreContainerX> */}
            {/* <SectionTitle>
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
            </ExploreContainer> */}
          </div>
        )
      })}
    </PageGrid>
  )
}
