import React, { useState } from 'react'
import styled from 'styled-components'
import Filter from '../common/Filter'
import Thumbnails from './ExploreThumbs'
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

export default function ExplorePage({ onGeneClick, cards }) {
  const [activeTag, setActiveTag] = useState('all')

  return (
    <PageGrid>
      <Title data-cy="header-title">Explore</Title>
      <Filter
        onGeneClick={onGeneClick}
        cards={cards}
        activeTag={activeTag}
        setActiveTag={setActiveTag}
      />
      <ExploreContainer>
        {cards.map(card => (
          <Thumbnails
            image={card._links.image.href.replace('{image_version}', 'medium')}
            {...card}
            key={card.id}
          />
        ))}
      </ExploreContainer>
    </PageGrid>
  )
}
