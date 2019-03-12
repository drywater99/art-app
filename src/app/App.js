import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
import styled from 'styled-components'
import HomePage from '../cards/HomePage'
import ExplorePage from '../cards/ExplorePage'
import SavedPage from '../cards/SavedPage'
import SingleCardPage from '../cards/SingleCardPage'
import axios from 'axios'

//import { Helmet } from 'react-helmet'

import { getGeneData } from '../services'
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
  const [cards, setCards] = useState([])

  function getTrendingArtists() {
    const urlString = 'https://api.artsy.net/api/artworks?size=20'

    axios
      .get(urlString, {
        headers: {
          'X-Xapp-Token':
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTU1MjQ5NTU2MiwiaWF0IjoxNTUxODkwNzYyLCJhdWQiOiI1YzdmZjk0OTI5MGViYTI4NGZjNzdhNTQiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWM3ZmY5NGEyOTBlYmE0OTE3NWUxZDlhIn0.xuujDMTwmKjPc16Gtjwri4PhdshtAEX5QHg32WtpmoQ',
        },
      })
      .then(res => {
        const results = res.data._embedded.artworks
        setCards(results)
      })
  }

  useEffect(() => {
    getTrendingArtists()
  }, [])

  function filterByGene(url) {
    getGeneData(url).then(res => {
      const results = res.data._embedded.artists
      setCards(results)
    })
  }

  function toggleBookmark(card) {
    const index = cards.indexOf(card)
    setCards([
      ...cards.slice(0, index),
      { ...card, bookmarked: !card.bookmarked },
      ...cards.slice(index + 1),
    ])
  }

  console.log(cards)

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
          path="/explore"
          render={() => (
            <ExplorePage
              cards={cards}
              onGeneClick={filterByGene}
              onBookmark={toggleBookmark}
            />
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

        <Route path="/artsy" component={ArtsyCards} />
        <Nav>
          <StyledLink exact to="/">
            Home
          </StyledLink>
          <StyledLink to="/explore">Explore</StyledLink>
          <StyledLink to="/saved">Saved</StyledLink>
        </Nav>
        <GlobalStyle />
      </Grid>
    </Router>
  )
}

export default App
