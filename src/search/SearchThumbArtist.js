import React from 'react'
import styled from 'styled-components'
import { StyledLink, ProfileTitle } from './SearchMainStyles'

const ImageCard = styled.div`
  height: 120px;
  width: 120px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  border-radius: 100%;
  position: relative;
`

export default function SearchThumbArtist({ image, id, title, name }) {
  return (
    <StyledLink to={`/artist/${id}`}>
      <ImageCard style={{ backgroundImage: 'url(' + image + ')' }} />
      <ProfileTitle>{title || name}</ProfileTitle>
    </StyledLink>
  )
}
