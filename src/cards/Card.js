import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const BorderCard = styled.section`
  padding: 10px 0 0;
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
  align-items: center;
  justify-content: space-between;
  width: 325px;
  padding: 22px 20px 20px 22px;
  background: #fafafa;
  border-radius: 0 0 12px 12px;
`

const Bookmark = styled.div`
  width: 20px;
  height: 10px;
  background: ${p => (p.active ? '#007aff' : '#383838')};
  transition: all 0.4s ease;
  margin-top: -50px;

  &:after {
    transition: all 0.4s ease;
    display: block;
    top: 100%;
    content: '';
    border: 10px solid ${p => (p.active ? '#007aff' : '#383838')};
    border-bottom-color: transparent;
  }
`

Card.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  bookmarked: PropTypes.bool,
  onBookmark: PropTypes.func,
}

Card.defaultProps = {
  title: 'No title defined',
  content: 'No content defined',
  bookmarked: false,
}

export default function Card({
  title,
  author,
  image,
  id,
  onBookmark,
  bookmarked,
  date,
  collecting_institution,
}) {
  return (
    <StyledLink to={`/artwork/${id}`}>
      <BorderCard>
        <ImageCard
          data-cy="card-image"
          style={{ backgroundImage: 'url(' + image + ')' }}
        />
        <ContentCard data-cy="card-content">
          <div>
            <h3>{date}</h3>
            <p>{title}</p>
            <small>{collecting_institution}</small>
          </div>
          {onBookmark && <Bookmark active={bookmarked} onClick={onBookmark} />}
        </ContentCard>
      </BorderCard>
    </StyledLink>
  )
}
