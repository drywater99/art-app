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
  height: 280px;
  width: 325px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  border-radius: 12px 12px 0 0;
  position: relative;
`

const ContentCard = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 325px;
  padding: 22px 20px 20px 22px;
  background: #fafafa;
  border-radius: 0 0 12px 12px;
`

CardArtwork.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  bookmarked: PropTypes.bool,
  onBookmark: PropTypes.func,
}

CardArtwork.defaultProps = {
  title: 'No title defined',
  content: 'No content defined',
  bookmarked: false,
}

export default function CardArtwork({
  title,
  date,
  image,
  id,
  collecting_institution,
}) {
  return (
    <BorderCard>
      <StyledLink to={`/artwork/${id}`}>
        <ImageCard
          data-cy="card-image"
          style={{ backgroundImage: 'url(' + image + ')' }}
        />
      </StyledLink>
      <ContentCard data-cy="card-content">
        <StyledLink to={`/artwork/${id}`}>
          <h3>{date}</h3>
          <p>{title}</p>
          <small>{collecting_institution}</small>
        </StyledLink>
      </ContentCard>
    </BorderCard>
  )
}
