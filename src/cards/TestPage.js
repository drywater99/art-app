import React, { useState } from 'react'
import styled from 'styled-components'
import TestCard from './TestCard'
import CardContainer from './CardContainer'
import Title from '../common/Title'

const PageGrid = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr;
  overflow: hidden;
`

export default function TestPage({ onClick, cards, CardBox }) {
  const [activeTag, setActiveTag] = useState('all')

  return (
    <PageGrid>
      <Title data-cy="header-title">Recommended Works</Title>
      <CardContainer>
        {cards
          .filter(card => activeTag === 'all' || card.tags.includes(activeTag))
          .map(card => (
            <TestCard
              title={card.title}
              author={card.author}
              image={card.image}
              {...card}
              key={card.id}
              onClick={() => onClick(CardBox)}
            />
          ))}
      </CardContainer>
    </PageGrid>
  )
}
