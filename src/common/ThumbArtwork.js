import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-content: stretch;
`

const ProfileImage = styled.div`
  min-height: 150px;
  max-height: 320px;
  width: 150px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  border-radius: 12px;
`

const ProfileTitle = styled.div`
  display: flex;
  align-items: flex-end;
  font-weight: bold;
  font-size: 15px;
  color: #949494;
  margin-top: 8px;
`

export default function ThumbSimGene({ image, date, title, id }) {
  return (
    <StyledLink to={`/artwork/${id}`}>
      <ProfileImage style={{ backgroundImage: 'url(' + image + ')' }} />
      <ProfileTitle>{title}</ProfileTitle>
      <ProfileTitle>{date}</ProfileTitle>
    </StyledLink>
  )
}
