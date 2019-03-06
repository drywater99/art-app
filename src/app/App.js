import React, { useState } from 'react'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
import styled from 'styled-components'
import CardsPage from '../cards/CardsPage'
import PersonList from '../testapi/PersonList'

//import { Helmet } from 'react-helmet'
import uid from 'uid'

import {
  //getAllCards,
  //getCardsFromStorage,
  toggleCardBookmark,
} from '../services'
import GlobalStyle from './GlobalStyle'

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
      author: 'Lorem Ipsum',
      title: 'Lorem Ipsum Dolor sit',
      tags: ['tag1'],
      content:
        'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
      uploadDate: '2019-03-05T10:51',
      id: uid(),
      image: 'http://via.placeholder.com/500x300/',
    },
    {
      author: 'Lorem Ipsum',
      title: 'Lorem Ipsum Dolor sit',
      tags: ['tag2'],
      content:
        'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
      uploadDate: '2019-03-05T10:51',
      id: uid(),
      image: 'http://via.placeholder.com/500x300/',
    },
    {
      author: 'Lorem Ipsum',
      title: 'Lorem Ipsum Dolor sit',
      tags: ['tag3'],
      content:
        'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
      uploadDate: '2019-03-05T10:51',
      id: uid(),
      image: 'http://via.placeholder.com/500x300/',
    },
    {
      author: 'Lorem Ipsum',
      title: 'Lorem Ipsum Dolor sit',
      tags: ['tag4'],
      content:
        'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
      uploadDate: '2019-03-05T10:51',
      id: uid(),
      image: 'http://via.placeholder.com/500x300/',
    },
    {
      author: 'Lorem Ipsum',
      title: 'Lorem Ipsum Dolor sit',
      tags: ['tag5'],
      content:
        'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
      uploadDate: '2019-03-05T10:51',
      id: uid(),
      image: 'http://via.placeholder.com/500x300/',
    },
    {
      author: 'Lorem Ipsum',
      title: 'Lorem Ipsum Dolor sit',
      tags: ['tag6'],
      content:
        'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
      uploadDate: '2019-03-05T10:51',
      id: uid(),
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
        <Route path="/personlist" component={PersonList} />
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
