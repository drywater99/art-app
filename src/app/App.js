import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
import styled from 'styled-components'
import CardsPage from '../cards/CardsPage'
import { Helmet } from 'react-helmet'

import {
  getAllCards,
  getCardsFromStorage,
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
  background: #333;
  color: white;
  text-decoration: none;

  &.active {
    background: hotpink;
  }
`

function App() {
  const [cards, setCards] = useState(getCardsFromStorage())

  useEffect(() => {
    getAllCards().then(res => {
      setCards(res.data)
    })
  }, [])

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
        <Helmet>
          <meta charSet="utf-8" />
          <title>My Title</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
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
        <Nav>
          <StyledLink exact to="/">
            Home
          </StyledLink>
          <StyledLink to="/bookmarks">Bookmarks</StyledLink>
        </Nav>
        <GlobalStyle />
      </Grid>
    </Router>
  )
}

export default App
