import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const ImageCard = styled.div`
  height: 140px;
  width: 140px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  border-radius: 12px;
  position: relative;
`
const ProfileTitle = styled.div`
  font-weight: bold;
  font-size: 15px;
  color: #949494;
  margin-top: 8px;
  text-align: center;
`

export default function ThumbSearch({ image, id, title, name, urlCategory }) {
  return (
    <StyledLink to={`/${urlCategory}/${id}`}>
      <ImageCard style={{ backgroundImage: 'url(' + image + ')' }} />
      <ProfileTitle>{title || name}</ProfileTitle>
    </StyledLink>
  )
}
