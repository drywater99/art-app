import React, { useState } from 'react'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
import styled from 'styled-components'
import CardsPage from '../cards/CardsPage'
import SingleCardPage from '../cards/SingleCardPage'
import ArtCard from '../testapi/ArtCard'

//import { Helmet } from 'react-helmet'

import {
  //getAllCards,
  //getCardsFromStorage,
  toggleCardBookmark,
} from '../services'
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

function App() {
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
    },
    {
      author: 'Lorem Ipsum III',
      title: 'Lorem Ipsum Dolor sit',
      tags: ['tag3'],
      content:
        'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
      uploadDate: '2019-03-05T10:51',
      id: '02',
      image: 'http://via.placeholder.com/500x300/',
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
    },
  ])

  function toggleBookmark(card) {
    toggleCardBookmark(card)
      .then(res => {
        const index = cards.indexOf(card)
        setCards([
          ...cards.slice(0, index),
          { ...res.data },
          ...cards.slice(index + 1),
        ])
      })
      .catch(err => console.log(err))
  }

  return (
    <Router>
      <Grid>
        <Route
          exact
          path="/"
          render={() => <CardsPage cards={cards} onBookmark={toggleBookmark} />}
        />
        <Route
          path="/bookmarks"
          render={() => (
            <CardsPage
              cards={cards.filter(card => card.bookmarked)}
              onBookmark={toggleBookmark}
            />
          )}
        />
        <Route
          path="/artwork/:id"
          render={({ match }) => (
            <SingleCardPage
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
          <StyledLink to="/bookmarks">Saved</StyledLink>
        </Nav>
        <GlobalStyle />
      </Grid>
    </Router>
  )
}

export default App
