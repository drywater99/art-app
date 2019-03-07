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

const Bookmark = styled.div`
  position: fixed;
  right: 30px;
  width: 20px;
  height: 8px;
  background: ${p => (p.active ? 'blue' : 'black')};
  transition: all 0.4s ease;

  &:after {
    transition: all 0.4s ease;
    position: absolute;
    display: block;
    content: '';
    border: 10px solid ${p => (p.active ? 'blue' : 'black')};
    border-bottom-color: transparent;
  }
`

export default function SingleCardPage({ card, bookmarked, onBookmark }) {
  return (
    <PageGrid>
      <ImageCard style={{ backgroundImage: 'url(' + card.image + ')' }} />
      <PageContainer>
        {onBookmark && <Bookmark active={bookmarked} onClick={onBookmark} />}
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
