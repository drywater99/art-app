import React from 'react'
import styled from 'styled-components'
import HomeCard from './HomeCard'
import Title from '../common/Title'

const PageGrid = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr;
  overflow: hidden;
`
const CardContainer = styled.section`
  display: grid;
  align-content: flex-start;
  justify-content: center;
  grid-gap: 12px;
  padding: 4px 12px 12px;
  overflow-y: scroll;
`

export default function HomePage({ onBookmark, artworks }) {
  return (
    <PageGrid>
      <Title data-cy="header-title">Recommended Works</Title>
      <CardContainer>
        {artworks
          .filter(artwork => artwork.slug)
          .map(artwork => (
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
