import React, { useState } from 'react'
import styled from 'styled-components'
import Header from '../common/Header'
import Card from './Card'
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

export default function SavedPage({ onBookmark, cards }) {
  const [activeTag, setActiveTag] = useState('all')

  return (
    <PageGrid>
      <Header cards={cards} activeTag={activeTag} setActiveTag={setActiveTag} />
      <Title>Saved</Title>
      <CardContainer>
        {cards
          .filter(card => activeTag === 'all' || card.tags.includes(activeTag))
          .map(card => (
            <Card
              title={card.title}
              author={card.author}
              image={card.image}
              {...card}
              key={card.id}
              onBookmark={() => onBookmark(card)}
            />
          ))}
      </CardContainer>
    </PageGrid>
  )
}
