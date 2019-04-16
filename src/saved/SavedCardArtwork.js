import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const BorderCard = styled.section`
  padding: 10px 0 0 0;
  filter: drop-shadow(0 5px 5px #cccccc);
`
const StyledLink = styled(Link)`
  text-decoration: none;
`

const ImageCard = styled.div`
  height: 140px;
  width: 140px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  border-radius: 8px 8px 0 0;
  position: relative;
`

const ContentCard = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  height: 90px;
  width: 140px;
  padding: 8px 10px 10px 10px;
  background: #fafafa;
  border-radius: 0 0 8px 8px;
`

const CardTitle = styled.p`
  margin-bottom: 8px;
  color: #383838;
  font-weight: 900;
  font-size: 14px;
  line-height: 1.3;
  letter-spacing: 0.1em;
`

const CardDate = styled.h3`
  text-transform: uppercase;
  font-weight: bold;
  color: #949494;
  font-size: 12px;
  margin: 0;
  letter-spacing: 0.1em;
`

SavedCardArtwork.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  bookmarked: PropTypes.bool,
  onBookmark: PropTypes.func,
}

SavedCardArtwork.defaultProps = {
  title: 'No title defined',
  content: 'No content defined',
  bookmarked: false,
}

export default function SavedCardArtwork({
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
          <CardTitle>{title}</CardTitle>
          <CardDate>{date}</CardDate>
        </StyledLink>
      </ContentCard>
    </BorderCard>
  )
}
