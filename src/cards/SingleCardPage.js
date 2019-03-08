import React from 'react'
import styled from 'styled-components'

const PageGrid = styled.section`
  display: grid;
  align-content: flex-start;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`
const ImageCard = styled.div`
  height: 320px;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 25px;
`
const PageContainer = styled.section`
  display: grid;
  align-content: flex-start;
  padding: 0 25px 25px 25px;
`

const BookmarkContainer = styled.section`
  display: flex;
  justify-content: flex-end;
  height: 30px;
  margin: 0 25px 25px;
`

const Bookmark = styled.div`
  right: 30px;
  width: 20px;
  height: 10px;
  background: ${p => (p.active ? '#007aff' : '#383838')};
  transition: all 0.4s ease;

  &:after {
    transition: all 0.4s ease;
    display: block;
    content: '';
    border: 10px solid ${p => (p.active ? '#007aff' : '#383838')};
    border-bottom-color: transparent;
  }
`

const FullImage = styled.img`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 0 25px 25px;
  width: 100%;
  .fill {
    object-fit: fill;
  }
`

export default function SingleCardPage({ card, onBookmark }) {
  return (
    <PageGrid>
      <ImageCard style={{ backgroundImage: 'url(' + card.image + ')' }} />
      <BookmarkContainer>
        <Bookmark active={card.bookmarked} onClick={() => onBookmark(card)} />
      </BookmarkContainer>
      <PageContainer>
        <h3>{card.author}</h3>
        <p>{card.title}</p>
        <h4>{card.content}</h4>
      </PageContainer>
      <FullImage src={card.image} />
      <PageContainer>
        <h4>{card.content}</h4>
      </PageContainer>
    </PageGrid>
  )
}
