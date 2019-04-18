import PropTypes from 'prop-types'
import React from 'react'
import {
  BorderCard,
  StyledLink,
  ImageCardArtwork,
  ContentCard,
} from './CardStyles'

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
        <ImageCardArtwork
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
