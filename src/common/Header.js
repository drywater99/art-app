import React from 'react'
import Filter from './Filter'
import styled from 'styled-components'

const StyledHeader = styled.header`
  overflow: hidden;
`

export default function Header({ cards, activeTag, setActiveTag, image }) {
  const tags = [
    'all',
    ...new Set(cards.reduce((prev, curr) => [...prev, ...curr.tags], [])),
  ]
  // const tagsImages = [
  //   tags,
  //   ...new Set(cards.reduce((prev, curr) => [...prev, ...curr.image], [])),
  // ]

  return (
    <StyledHeader>
      <Filter
        image={image}
        items={tags}
        active={activeTag}
        onClick={setActiveTag}
      />
    </StyledHeader>
  )
}
