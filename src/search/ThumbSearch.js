import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledLink = styled(Link)`
  text-decoration: none;
`

const ImageCard = styled.div`
  height: 150px;
  width: 150px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 100%;
  position: relative;
`
const ProfileTitle = styled.div`
  display: flex;
  align-items: flex-end;
  font-weight: bold;
  font-size: 15px;
  color: #949494;
  margin-top: 8px;
`

export default function ThumbSearch({ image, id, title, name }) {
  return (
    <StyledLink to={`/artist/${id}`}>
      <ImageCard style={{ backgroundImage: 'url(' + image + ')' }} />
      <ProfileTitle>{title || name}</ProfileTitle>
    </StyledLink>
  )
}
