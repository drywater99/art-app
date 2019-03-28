import React from 'react'
import styled from 'styled-components'
import HomeCard from '../common/CardArtwork'
import Title from '../common/Title'

const PageGrid = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  -webkit-overflow-scrolling: touch;
`
const CardContainer = styled.section`
  display: grid;
  align-content: flex-start;
  justify-content: center;
  grid-gap: 12px;
  padding: 4px 12px 12px;
`

export default function SavedMain({ onBookmark, artworks }) {
  //const [activeTag, setActiveTag] = useState('all')
  console.log(artworks)

  return (
    <PageGrid>
      <Title>Saved</Title>
      <CardContainer>
        {artworks.map(artwork => (
          <HomeCard
            date={artwork.date}
            bookmarked={artwork.bookmarked}
            collecting_institution={artwork.collecting_institution}
            author={artwork.author}
            image={artwork._links.image.href.replace(
              '{image_version}',
              'large'
            )}
            {...artwork}
            artwork={artwork}
            key={artwork.id}
            onBookmark={onBookmark}
          />
        ))}
      </CardContainer>
    </PageGrid>
  )
}
