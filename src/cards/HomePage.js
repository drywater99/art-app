import React from 'react'
import styled from 'styled-components'
import Card from './Card'
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
`

export default function HomePage({ onBookmark, cards }) {
  return (
    <PageGrid>
      <Title data-cy="header-title">Recommended Works</Title>
      <CardContainer>
        {cards.map(card => (
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
