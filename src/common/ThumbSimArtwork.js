import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ThumbContainer = styled.section`
  display: flex;
  white-space: nowrap;
  scroll-padding: 20px;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  cursor: default;
  height: 200px;
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

export default function ThumbSimArtwork({ image, id }) {
  return (
    <StyledLink to={`/artwork/${id}`}>
      <ThumbContainer>
        <ProfileImage style={{ backgroundImage: 'url(' + image + ')' }} />
      </ThumbContainer>
    </StyledLink>
  )
}
