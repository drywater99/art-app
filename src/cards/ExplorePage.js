import React, { useState } from 'react'
import styled from 'styled-components'
import Header from '../common/Header'
import Thumbnails from './Thumbnails'
import Title from '../common/Title'

const PageGrid = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr;
  overflow: hidden;
`

const ExploreContainer = styled.section`
  display: grid;
  grid-template-columns: 150px 150px;
  grid-template-rows: auto;
  grid-column-gap: 21px;
  grid-row-gap: 18px;
  padding: 25px;
  overflow-y: scroll;
`

export default function ExplorePage({ onBookmark, cards }) {
  const [activeTag, setActiveTag] = useState('all')

  return (
    <PageGrid>
      <Title>Explore</Title>
      <Header cards={cards} activeTag={activeTag} setActiveTag={setActiveTag} />
      <ExploreContainer>
        {cards
          .filter(card => activeTag === 'all' || card.tags.includes(activeTag))
          .map(card => (
            <Thumbnails image={card.image} {...card} key={card.id} />
          ))}
      </ExploreContainer>
    </PageGrid>
  )
}
