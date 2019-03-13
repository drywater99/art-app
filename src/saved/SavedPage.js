import React, { useState } from 'react'
import styled from 'styled-components'
import Header from '../common/Filter'
import HomeCard from '../home/HomeCard'
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

export default function SavedPage({ onBookmark, artworks }) {
  const [activeTag, setActiveTag] = useState('all')

  return (
    <PageGrid>
      <Header
        artworks={artworks}
        activeTag={activeTag}
        setActiveTag={setActiveTag}
      />
      <Title>Saved</Title>
      <CardContainer>
        {artworks.map(artwork => (
          <HomeCard
            date={artwork.date}
            collecting_institution={artwork.collecting_institution}
            author={artwork.author}
            image={artwork._links.image.href.replace(
              '{image_version}',
              'large'
            )}
            {...artwork}
            key={artwork.id}
            onBookmark={() => onBookmark(artwork)}
          />
        ))}
      </CardContainer>
    </PageGrid>
  )
}
