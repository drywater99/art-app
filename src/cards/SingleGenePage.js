import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import RelatedArtistsThumbs from './RelatedArtistsThumbs'
import axios from 'axios'

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

const ExploreContainer = styled.section`
  display: grid;
  grid-template-columns: 150px 150px;
  grid-template-rows: auto;
  grid-column-gap: 21px;
  grid-row-gap: 18px;
  padding: 25px;
`

export default function SingleGenePage({ card, onBookmark }) {
  const [artists, setArtists] = useState([])

  function getRelatedArtists() {
    const urlString =
      'https://api.artsy.net/api/artists?gene_id=51b662978b3b81ec27000285'

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

  const image = card._links.image.href.replace('{image_version}', 'square500')

  function goBack() {
    window.history.back()
  }

  return (
    <PageGrid>
      <CloseLink onClick={goBack}>x</CloseLink>
      <ImageCard
        image={card._links.image.href.replace('{image_version}', 'large')}
        style={{ backgroundImage: 'url(' + image + ')' }}
      />
      <BookmarkContainer>
        <Bookmark active={card.bookmarked} onClick={() => onBookmark(card)} />
      </BookmarkContainer>
      <ContentContainer>
        <p>{card.display_name}</p>
        <small>{card.description}</small>
      </ContentContainer>
      <ContentContainer>
        <p>Related Artists</p>
      </ContentContainer>
      <ExploreContainer>
        {artists.map(artist => (
          <RelatedArtistsThumbs
            image={artist._links.image.href.replace(
              '{image_version}',
              'square'
            )}
            name={artist.name}
            key={artist.id}
          />
        ))}
      </ExploreContainer>
    </PageGrid>
  )
}
