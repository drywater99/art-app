import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const CardBox = styled.div`
  position: relative;
  height: 380px;
  width: 325px;
  + .card {
    margin-top: 40px;
  }
`
const CardContent = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(255, 255, 255, 0);
  overflow: hidden;
  transition: all 0.4s ease-in-out;
`
const CardCover = styled.div`
  position: relative;
  height: 412px;
  width: 100%;
  padding: 15px;
  background-size: cover;
  color: #fff;
  border-radius: 15px;
  transition: all 0.4s ease-in-out;
  user-select: none;
  z-index: 100;
  .category {
    color: rgba(255, 255, 255, 0.7);
    font-weight: 500;
    text-transform: uppercase;
  }
`

const CardCategory = styled.span``
const CardTitle = styled.h2`
  margin: 0;
  font-size: 28px;
`
const CardTips = styled.span`
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 20px;
  color: rgba(255, 255, 255, 0.7);
`
const CardArticle = styled.article`
  padding: 15px;
  transition: all 0.4s;
  transform: translateY(-20%);
  opacity: 0;
`
const CloseButton = styled.button`
  position: absolute;
  right: 15px;
  top: 15px;
  appearance: none;
  border: none;
  height: 20px;
  width: 20px;
  border-radius: 20px;
  line-height: 1;
  background: rgba(255, 255, 255, 0.8);
  color: rgba(0, 0, 0, 0.8);
  text-align: center;
  cursor: pointer;
  opacity: 0;
  transition: all 0.4s ease-in-out, background 0.3s linear, color 0.3s linear;
  &.reverse {
    background: rgba(0, 0, 0, 0.8);
    color: rgba(255, 255, 255, 0.8);
  }
  &.open {
    .close {
      z-index: 600;
      opacity: 1;
    }
    .content {
      z-index: 500;
      left: -15px;
      right: -15px;
      height: 612px;
      overflow: hidden;
      overflow-y: auto;
      background: rgba(255, 255, 255, 1);
    }
    .cover {
      border-radius: 0;
    }
    .article {
      transform: translateY(0);
      opacity: 1;
    }
  }
`

TestCard.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  bookmarked: PropTypes.bool,
  onBookmark: PropTypes.func,
}

TestCard.defaultProps = {
  title: 'No title defined',
  content: 'No content defined',
  bookmarked: false,
}

export default function TestCard({
  title,
  author,
  image,
  id,
  card,
  onClick,
  bookmarked,
}) {
  return (
    <CardBox onClick={onClick}>
      <CardContent>
        <CardCover
          style={{
            backgroundImage:
              'url(https://is5-ssl.mzstatic.com/image/thumb/Features128/v4/a6/c4/92/a6c4924e-6b5d-4073-1cbf-44789c62cbc9/source/939x687sr.jpg)',
          }}
        >
          <CardCategory>MEET THE DEVELOPER</CardCategory>
          <CardTitle>About a boy: Inside an indie masterpiece</CardTitle>
          <CardTips>
            Tap to read more about the award-winning game Inside.
          </CardTips>
        </CardCover>
        <CardArticle>
          <p>About a boy: Inside an indie masterpiece</p>
          <p>Tap to read more about the award-winning game Inside.</p>
          <p>About a boy: Inside an indie masterpiece</p>
          <p>Tap to read more about the award-winning game Inside.</p>
          <p>About a boy: Inside an indie masterpiece</p>
          <p>Tap to read more about the award-winning game Inside.</p>
          <p>About a boy: Inside an indie masterpiece</p>
          <p>Tap to read more about the award-winning game Inside.</p>
          <p>About a boy: Inside an indie masterpiece</p>
        </CardArticle>
      </CardContent>
      <CloseButton>×</CloseButton>
    </CardBox>
  )
}
