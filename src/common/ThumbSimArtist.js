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
`
const ProfileTitle = styled.div`
  font-weight: bold;
  color: #383838;
  text-align: center;
  margin-top: 12px;
`
const CardDate = styled.h3`
  text-transform: uppercase;
  font-weight: bold;
  color: #949494;
  font-size: 12px;
  margin: 0;
  letter-spacing: 0.1em;
`

export default function ThumbSimArtist({
  image,
  name,
  birthday,
  deathday,
  id,
}) {
  return (
    <StyledLink to={`/artist/${id}`}>
      <ProfileImage style={{ backgroundImage: 'url(' + image + ')' }} />
      <ProfileTitle>{name}</ProfileTitle>
      <CardDate>
        {birthday}-{deathday}
      </CardDate>
    </StyledLink>
  )
}
