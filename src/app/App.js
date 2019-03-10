import React, { useState } from 'react'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
import styled from 'styled-components'
import HomePage from '../cards/HomePage'
import TestPage from '../cards/TestPage'
import ExplorePage from '../cards/ExplorePage'
import SavedPage from '../cards/SavedPage'
import SingleCardPage from '../cards/SingleCardPage'
import ArtCard from '../testapi/ArtCard'

//import { Helmet } from 'react-helmet'

//import {
//getAllCards,
//getCardsFromStorage,
//toggleCardBookmark,
//} from '../services'
import GlobalStyle from './GlobalStyle'
import ArtsyCards from '../testapi/ArtsyCards'

const Grid = styled.div`
  display: grid;
  grid-template-rows: auto 48px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const Nav = styled.nav`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 2px;
`

const StyledLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  margin: 15px 24px;
  color: #383838;
  text-decoration: none;
  &.active {
    text-decoration: underline;
  }
`

function App(PageGrid, CardBox) {
  const [cards, setCards] = useState([
    {
      author: 'Lorem Ipsum I',
      title: 'Lorem Ipsum Dolor sit',
      tags: ['tag1'],
      content:
        'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
      uploadDate: '2019-03-05T10:51',
      id: '01',
      image: 'http://via.placeholder.com/500x300/',
      bookmarked: false,
    },
    {
      author: 'Lorem Ipsum II',
      title: 'Lorem Ipsum Dolor sit',
      tags: ['tag2'],
      content:
        'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
      uploadDate: '2019-03-05T10:51',
      id: '02',
      image: 'http://via.placeholder.com/500x300/',
      bookmarked: true,
    },
    {
      author: 'Lorem Ipsum II',
      title: 'Lorem Ipsum Dolor sit',
      tags: ['tag3'],
      content:
        'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
      uploadDate: '2019-03-05T10:51',
      id: '02',
      image: 'http://via.placeholder.com/500x300/',
      bookmarked: true,
    },
    {
      author: 'Lorem Ipsum IV',
      title: 'Lorem Ipsum Dolor sit',
      tags: ['tag4'],
      content:
        'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
      uploadDate: '2019-03-05T10:51',
      id: '03',
      image: 'http://via.placeholder.com/500x300/',
      bookmarked: false,
    },
    {
      author: 'Lorem Ipsum V',
      title: 'Lorem Ipsum Dolor sit',
      tags: ['tag5'],
      content:
        'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
      uploadDate: '2019-03-05T10:51',
      id: '04',
      image: 'http://via.placeholder.com/500x300/',
      bookmarked: false,
    },
    {
      author: 'Lorem Ipsum VI',
      title: 'Lorem Ipsum Dolor sit',
      tags: ['tag6'],
      content:
        'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
      uploadDate: '2019-03-05T10:51',
      id: '05',
      image: 'http://via.placeholder.com/500x300/',
      bookmarked: false,
    },
    {
      author: 'Lorem Ipsum VII',
      title: 'Lorem Ipsum Dolor sit',
      tags: ['tag7'],
      content:
        'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
      uploadDate: '2019-03-05T10:51',
      id: '06',
      image: 'http://via.placeholder.com/500x300/',
      bookmarked: false,
    },
    {
      author: 'Lorem Ipsum VIII',
      title: 'Lorem Ipsum Dolor sit',
      tags: ['tag8'],
      content:
        'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
      uploadDate: '2019-03-05T10:51',
      id: '07',
      image: 'http://via.placeholder.com/500x300/',
      bookmarked: false,
    },
    {
      author: 'Lorem Ipsum IX',
      title: 'Lorem Ipsum Dolor sit',
      tags: ['tag9'],
      content:
        'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
      uploadDate: '2019-03-05T10:51',
      id: '08',
      image: 'http://via.placeholder.com/500x300/',
      bookmarked: false,
    },
    {
      author: 'Lorem Ipsum IX',
      title: 'Lorem Ipsum Dolor sit',
      tags: ['tag9'],
      content:
        'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
      uploadDate: '2019-03-05T10:51',
      id: '09',
      image: 'http://via.placeholder.com/500x300/',
      bookmarked: false,
    },
    {
      author: 'Lorem Ipsum X',
      title: 'Lorem Ipsum Dolor sit',
      tags: ['tag10'],
      content:
        'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
      uploadDate: '2019-03-05T10:51',
      id: '10',
      image: 'http://via.placeholder.com/500x300/',
      bookmarked: false,
    },
  ])

  function openTestCard() {
    if (CardBox.classList.contains({ class: 'open' })) {
      close(CardBox)
    } else {
      open(CardBox)
    }
  }

  const open = target => {
    const offsetY = PageGrid.scrollTop - target.offsetTop
    const content = target.querySelector('.content')
    const close = target.querySelector('.close')
    target.classList.add('open')
    PageGrid.classList.add('lock')
    console.log(close)
    close.style.transform = `translateX(15px) translateY(${offsetY}px)`
    content.style.top = `${offsetY}px`
    content.onscroll = e => {
      if (
        !close.classList.contains({ class: 'reverse' }) &&
        content.scrollTop > 386
      ) {
        close.classList.add({ class: 'reverse' })
      } else if (
        close.classList.contains({ class: 'reverse' }) &&
        content.scrollTop <= 386
      ) {
        close.classList.remove({ class: 'reverse' })
      }
    }
  }

  const close = target => {
    const content = target.querySelector('.content')
    const close = target.querySelector('.close')
    const cover = content.querySelector('.cover')
    target.classList.remove('open')
    PageGrid.classList.remove('lock')
    close.style.transform = `translateY(0) translateX(0)`
    content.style.top = 0
    cover.style.top = `${content.scrollTop}px`
    content.onscroll = null
    setTimeout(() => {
      cover.style.transition = 'none'
      cover.style.top = '0'
      content.scrollTop = 0
      cover.style.transition = 'all .4s ease-in-out'
    }, 400)
  }

  function toggleBookmark(card) {
    const index = cards.indexOf(card)
    setCards([
      ...cards.slice(0, index),
      { ...card, bookmarked: !card.bookmarked },
      ...cards.slice(index + 1),
    ])
  }

  return (
    <Router>
      <Grid>
        <Route
          exact
          path="/"
          render={() => (
            <HomePage
              cards={cards.filter(card => !card.bookmarked)}
              onBookmark={toggleBookmark}
            />
          )}
        />
        <Route
          path="/testpage"
          render={() => (
            <TestPage
              cards={cards.filter(card => !card.bookmarked)}
              onBookmark={toggleBookmark}
              onClick={openTestCard}
            />
          )}
        />
        <Route
          path="/explore"
          render={() => (
            <ExplorePage cards={cards} onBookmark={toggleBookmark} />
          )}
        />
        <Route
          path="/saved"
          render={() => (
            <SavedPage
              cards={cards.filter(card => card.bookmarked)}
              onBookmark={toggleBookmark}
            />
          )}
        />
        <Route
          path="/artwork/:id"
          render={({ match }) => (
            <SingleCardPage
              onBookmark={toggleBookmark}
              id={match.params.id}
              card={cards.find(card => card.id === match.params.id)}
            />
          )}
        />
        <Route path="/artcard" component={ArtCard} />
        <Route path="/artsy" component={ArtsyCards} />
        <Nav>
          <StyledLink exact to="/">
            Home
          </StyledLink>
          <StyledLink to="/testpage">Test</StyledLink>
          <StyledLink to="/explore">Explore</StyledLink>
          <StyledLink to="/saved">Saved</StyledLink>
        </Nav>
        <GlobalStyle />
      </Grid>
    </Router>
  )
}

export default App
