import React, { useState } from 'react'
import Filter from './Filter'
import styled from 'styled-components'

const StyledHeader = styled.header`
  overflow: hidden;
`

export default function Header({
  cards,
  onGeneClick,
  activeTag,
  setActiveTag,
  image,
}) {
  // const tags = [
  //   'all',
  //   ...new Set(cards.reduce((prev, curr) => [...prev, ...curr.tags], [])),
  // ]

  const [genes] = useState([
    {
      name: 'hilibi',
      urlApi:
        'https://api.artsy.net/api/artists?gene_id=51b662a48b3b816b5c00034f&size=50',
    },
  ])

  // const tagsImages = [
  //   tags,
  //   ...new Set(cards.reduce((prev, curr) => [...prev, ...curr.image], [])),
  // ]

  return (
    <StyledHeader>
      <Filter
        genes={genes}
        image={image}
        // items={tags}
        active={activeTag}
        onClick={setActiveTag}
        onGeneClick={onGeneClick}
      />
    </StyledHeader>
  )
}
