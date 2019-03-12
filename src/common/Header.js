import React, { useState } from 'react'
import Filter from './Filter'
import styled from 'styled-components'

const StyledHeader = styled.header`
  overflow: hidden;
`

export default function Header({
  onGeneClick,
  activeTag,
  setActiveTag,
  image,
}) {
  const [genes] = useState([
    {
      name: '16th Century',
      urlApi:
        'https://api.artsy.net/api/artists?gene_id=51b662a48b3b816b5c00034f&size=50',
    },
  ])

  return (
    <StyledHeader>
      <Filter
        genes={genes}
        image={image}
        active={activeTag}
        onGeneClick={onGeneClick}
      />
    </StyledHeader>
  )
}
