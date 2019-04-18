import PropTypes from 'prop-types'
import React from 'react'
import {
  BorderCard,
  StyledLink,
  ImageCard,
  Category,
  ShowTitle,
} from './CardStyles'

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
