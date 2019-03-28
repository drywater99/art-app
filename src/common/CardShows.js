import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const BorderCard = styled.section`
  padding: 30px 0 0;
  filter: drop-shadow(0 10px 10px #cccccc);
`
const StyledLink = styled(Link)`
  text-decoration: none;
`

const ImageCard = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: 380px;
  width: 325px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  padding: 22px 20px 20px 22px;
  border-radius: 12px;
`
const ShowTitle = styled.p`
  margin-top: 5px;
  margin-bottom: 8px;
  color: #fcfcfc;
  font-weight: 900;
  font-size: 26px;
  line-height: 32px;
  letter-spacing: 0.1em;
  text-shadow: 1px 1px 7px #515151;
`

const Category = styled.p`
  text-transform: uppercase;
  font-weight: bold;
  color: #fcfcfc;
  font-size: 15px;
  margin: 0;
  letter-spacing: 0.1em;
  text-shadow: 1px 1px 7px #515151;
`

CardShows.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  bookmarked: PropTypes.bool,
  onBookmark: PropTypes.func,
}

CardShows.defaultProps = {
  title: 'No title defined',
  content: 'No content defined',
  bookmarked: false,
}

export default function CardShows({ name, id, image }) {
  return (
    <StyledLink to={`/show/${id}`}>
      <BorderCard>
        <ImageCard style={{ backgroundImage: 'url(' + image + ')' }}>
          <ShowTitle>{name}</ShowTitle>
          <Category>Show</Category>
        </ImageCard>
      </BorderCard>
    </StyledLink>
  )
}
