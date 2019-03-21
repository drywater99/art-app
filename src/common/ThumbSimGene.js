import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`

const ProfileImage = styled.div`
  height: 150px;
  width: 150px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  border-radius: 12px;
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

export default function ThumbSimGene({ image, name, display_name, id }) {
  return (
    <StyledLink to={`/gene/${id}`}>
      <ProfileImage style={{ backgroundImage: 'url(' + image + ')' }} />
      <ProfileTitle>{display_name || name}</ProfileTitle>
    </StyledLink>
  )
}
