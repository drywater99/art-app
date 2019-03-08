import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledLink = styled(Link)`
  text-decoration: none;
`

const ImageCard = styled.div`
  height: 150px;
  width: 150px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 12px;
  position: relative;
`

// Card.propTypes = {
//   title: PropTypes.string,
//   content: PropTypes.string,
//   tags: PropTypes.arrayOf(PropTypes.string),
//   bookmarked: PropTypes.bool,
//   onBookmark: PropTypes.func,
// }

// Card.defaultProps = {
//   title: 'No title defined',
//   content: 'No content defined',
//   bookmarked: false,
// }

export default function Thumbnails({
  title,
  author,
  image,
  id,
  card,
  onBookmark,
  bookmarked,
}) {
  return (
    <StyledLink to={`/artwork/${id}`}>
      <ImageCard style={{ backgroundImage: 'url(' + image + ')' }} />
    </StyledLink>
  )
}
