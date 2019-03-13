import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
import styled from 'styled-components'
import GlobalStyle from './GlobalStyle'
import HomePage from '../home/HomePage'
import HomeCardPage from '../home/HomeCardPage'
import ExplorePage from '../explore/ExplorePage'
import GenePage from '../gene/GenePage'
import GeneThumbPage from '../gene/GeneThumbPage'
import SavedPage from '../saved/SavedPage'
import { getGeneData, getTrendingArtistData, getGeneDataAll } from '../services'

//import { Helmet } from 'react-helmet'
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
  const [isLoading, setIsLoading] = useState()

  async function getTrendingArtists() {
    setIsLoading(true)
    await getTrendingArtistData().then(res => {
      const results = res.data._embedded.artworks
      setCards(results)
    })
    setIsLoading(true)
  }

  useEffect(() => {
    getTrendingArtists()
  }, [])

  async function getGenes() {
    setIsLoading(true)
    await getGeneDataAll().then(res => {
      const results = res.data._embedded.genes
      setCards(results)
    })

    setIsLoading(true)
  }

  useEffect(() => {
    getGenes()
  }, [])

  async function filterByGene(url) {
    setIsLoading(true)
    await getGeneData(url).then(res => {
      const results = res.data._embedded.artworks
      setCards(results)
    })
    setIsLoading(false)
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
          path="/explore"
          render={() => (
            <ExplorePage
              isLoading={isLoading}
              cards={cards}
              onGeneClick={filterByGene}
              onBookmark={toggleBookmark}
            />
          )}
        />
        <Route
          path="/genes"
          render={() => <GenePage cards={cards} onBookmark={toggleBookmark} />}
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
            <HomeCardPage
              onBookmark={toggleBookmark}
              id={match.params.id}
              card={cards.find(card => card.id === match.params.id)}
            />
          )}
        />
        <Route
          path="/gene/:id"
          render={({ match }) => (
            <GeneThumbPage
              onBookmark={toggleBookmark}
              id={match.params.id}
              card={cards.find(card => card.id === match.params.id)}
            />
          )}
        />

        <Route path="/artsy" component={ArtsyCards} />
        <Nav>
          <StyledLink exact to="/">
            H
          </StyledLink>
          <StyledLink to="/explore">E</StyledLink>
          <StyledLink to="/genes">G</StyledLink>
          <StyledLink to="/saved">S</StyledLink>
        </Nav>
        <GlobalStyle />
      </Grid>
    </Router>
  )
}

export default App
