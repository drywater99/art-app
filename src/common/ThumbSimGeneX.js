import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ThumbContainer = styled.section`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  scroll-padding: 20px;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  cursor: default;
  height: 230px;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const ProfileImage = styled.div`
  height: 200px;
  width: 235px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  border-radius: 12px;
  position: relative;
  position: relative;
  margin-right: 16px;
`
const ProfileTitle = styled.div`
  display: flex;
  align-items: flex-end;
  font-weight: bold;
  font-size: 15px;
  color: #949494;
  margin-top: 8px;
`

export default function ThumbSimGeneX({ image, id, name, display_name }) {
  return (
    <StyledLink to={`/gene/${id}`}>
      <ThumbContainer>
        <ProfileImage style={{ backgroundImage: 'url(' + image + ')' }} />
        <ProfileTitle>{display_name || name}</ProfileTitle>
      </ThumbContainer>
    </StyledLink>
  )
}
