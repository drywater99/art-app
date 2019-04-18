import React from 'react'
import styled from 'styled-components'
import { StyledLink, ProfileTitle } from './SearchMainStyles'

const ImageCard = styled.div`
  height: 140px;
  width: 140px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  border-radius: 12px;
  position: relative;
`

export default function ThumbSearch({ image, id, title, name, urlCategory }) {
  return (
    <StyledLink to={`/${urlCategory}/${id}`}>
      <ImageCard style={{ backgroundImage: 'url(' + image + ')' }} />
      <ProfileTitle>{title || name}</ProfileTitle>
    </StyledLink>
  )
}
