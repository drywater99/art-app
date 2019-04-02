import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledLink = styled(Link)`
  text-decoration: none;
`

const ImageCard = styled.div`
  height: 116px;
  width: 116px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 12px;
`

export default function ExploreThumb({ image, id }) {
  return (
    <StyledLink to={`/artwork/${id}`}>
      <ImageCard style={{ backgroundImage: 'url(' + image + ')' }} />
    </StyledLink>
  )
}
