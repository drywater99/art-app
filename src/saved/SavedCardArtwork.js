import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  text-decoration: none;
  margin: 5px;
  filter: drop-shadow(2px 2px 3px #cccccc);
`

const ImageCard = styled.div`
  height: 150px;
  width: 150px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  border-radius: 8px 8px 0 0;
  position: relative;
`

const ContentCard = styled.section`
  height: 90px;
  width: 150px;
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

export default function SavedCardArtwork({ title, date, image, id }) {
  return (
    <StyledLink to={`/artwork/${id}`}>
      <ImageCard
        data-cy="card-image"
        style={{ backgroundImage: 'url(' + image + ')' }}
      />
      <ContentCard data-cy="card-content">
        <CardTitle>{title}</CardTitle>
        <CardDate>{date}</CardDate>
      </ContentCard>
    </StyledLink>
  )
}
