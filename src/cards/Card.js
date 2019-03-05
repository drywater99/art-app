import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Images from './Images/roy_lichtenstein_maybe.jpg'

const BorderCard = styled.div`
  padding: 10px 0 0;
  filter: drop-shadow(0 10px 10px #cccccc);
`

const ImgCard = styled.section`
  height: 280px;
  width: 325px;
  background: url(https://artsation.com/images/RoyLichtensteinMMayb.jpg);
  background-size: 99%;
  border-radius: 12px 0 0 0;
  position: relative;
`
const StyledImg = styled.img`
  height: 330px;
  width: 330px;
  object-fit: cover;
`

const ContentCard = styled.div`
  width: 325px;
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

export default function Card({ title, content }) {
  return (
    <BorderCard>
      <ImgCard />
      <ContentCard>
        <h3>{title}</h3>
        <p>{content}</p>
      </ContentCard>
    </BorderCard>
  )
}
