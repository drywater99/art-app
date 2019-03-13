import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const ProfileImage = styled.div`
  height: 150px;
  width: 150px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  border-radius: 100%;
  position: relative;
`
const ProfileTitle = styled.div`
  font-weight: bold;
  color: #383838;
  margin-top: 12px;
`

export default function RelatedArtistsThumbs({ image, name, id }) {
  return (
    <StyledLink to={`/artist/${id}`}>
      <ProfileImage style={{ backgroundImage: 'url(' + image + ')' }} />
      <ProfileTitle>{name}</ProfileTitle>
    </StyledLink>
  )
}