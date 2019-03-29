import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { getArtistByArtworkData } from '../services'

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

const Bookmark = styled.div`
  width: 20px;
  height: 10px;
  background: ${p => (p.active ? '#b8847d' : '#383838')};
  transition: all 0.4s ease;
  margin-top: 4px;

  &:after {
    transition: all 0.4s ease;
    display: block;
    top: 100%;
    content: '';
    border: 10px solid ${p => (p.active ? '#b8847d' : '#383838')};
    border-bottom-color: transparent;
  }
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
  onBookmark,
  bookmarked,
  collecting_institution,
  artwork,
}) {
  const [artworkArtist, setArtworkArtist] = useState([])

  async function getArtistByArtwork() {
    await getArtistByArtworkData(id)
      .then(res => {
        setArtworkArtist(res.data._embedded.artists)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getArtistByArtwork()
  }, [])

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
        {onBookmark && (
          <Bookmark
            active={bookmarked === true}
            onClick={() => onBookmark(artwork)}
          />
        )}
      </ContentCard>
    </BorderCard>
  )
}
