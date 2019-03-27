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
  height: 250px;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const ProfileImage = styled.div`
  height: 235px;
  width: 235px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  border-radius: 100%;
  position: relative;
  position: relative;
  margin: 0 16px 0 0;
`
const ProfileTitle = styled.div`
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 15px;
  color: #949494;
  margin: 8px 16px 0 0;
  text-align: center;
`

export default function ThumbSimArtistX({ image, id, name, display_name }) {
  return (
    <StyledLink to={`/artist/${id}`}>
      <ThumbContainer>
        <ProfileImage style={{ backgroundImage: 'url(' + image + ')' }} />
        <ProfileTitle>{display_name || name}</ProfileTitle>
      </ThumbContainer>
    </StyledLink>
  )
}
