import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const BorderCard = styled.section`
  padding: 10px 0 0;
  filter: drop-shadow(0 10px 10px #cccccc);
`
const StyledLink = styled.a`
  text-decoration: none;
`

const ImageCard = styled.div`
  height: 280px;
  width: 325px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 12px 12px 0 0;
  position: relative;
`

const ContentCard = styled.section`
  width: 325px;
  padding: 20px 20px 10px 20px;
  position: relative;
  background: #fafafa;
  border-radius: 0 0 12px 12px;
`

/*const Bookmark = styled.div`
  position: absolute;
  right: 12px;
  top: -6px;
  width: 20px;
  height: 6px;
  background: ${p => (p.active ? 'crimson' : 'black')};
  transition: all 0.4s ease;

  &:after {
    transition: all 0.4s ease;
    position: absolute;
    display: block;
    top: 100%;
    content: '';
    border: 10px solid ${p => (p.active ? 'crimson' : 'black')};
    border-bottom-color: transparent;
  }
`*/

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

export default function Card({ title, author, image, id }) {
  return (
    <StyledLink to={`/artwork/${id}`}>
      <BorderCard>
        <ImageCard style={{ backgroundImage: 'url(' + image + ')' }} />
        <ContentCard>
          <h3>{author}</h3>
          <p>{title}</p>
        </ContentCard>
      </BorderCard>
    </StyledLink>
  )
}
