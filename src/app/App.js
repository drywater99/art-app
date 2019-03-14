import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
import styled from 'styled-components'
import GlobalStyle from './GlobalStyle'
import HomePage from '../home/HomePage'
import HomeCardPage from '../home/HomeCardPage'
import ExplorePage from '../explore/ExplorePage'
import GenePage from '../gene/GenePage'
import GeneThumbPage from '../gene/GeneThumbPage'
import RelArtworksThumbPage from '../gene/RelArtworksThumbPage'
import SavedPage from '../saved/SavedPage'
import { getTopicData, getTrendingArtworkData, getGeneData } from '../services'

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

function App(relatedArtworks) {
  const [artworks, setArtworks] = useState([])
  const [topics, setTopics] = useState([])
  const [genes, setGenes] = useState([])
  const [isLoading, setIsLoading] = useState()

  async function getTrendingArtworks() {
    setIsLoading(true)
    await getTrendingArtworkData().then(res => {
      const results = res.data._embedded.artworks
      setArtworks(results)
    })
    setIsLoading(false)
  }

  useEffect(() => {
    getTrendingArtworks()
  }, [])

  async function getGenes() {
    setIsLoading(true)
    await getGeneData().then(res => {
      const results = res.data._embedded.genes
      setGenes(results)
    })
    setIsLoading(false)
  }

  useEffect(() => {
    getGenes()
  }, [])

  async function getTopics(url) {
    setIsLoading(true)
    await getTopicData(url).then(res => {
      const results = res.data._embedded.artworks || res.data._embedded.artists
      setTopics(results)
    })
    setIsLoading(false)
  }

  useEffect(() => {
    getTopics()
  }, [])

  function toggleBookmark(artwork) {
    const index = artworks.indexOf(artwork)
    setArtworks([
      ...artworks.slice(0, index),
      { ...artwork, bookmarked: !artwork.bookmarked },
      ...artworks.slice(index + 1),
    ])
  }

  console.log(artworks)

  return (
    <Router>
      <Grid>
        <Route
          exact
          path="/"
          render={() => (
            <HomePage
              artworks={artworks.filter(artwork => !artwork.bookmarked)}
              onBookmark={toggleBookmark}
            />
          )}
        />
        <Route
          path="/explore"
          render={() => (
            <ExplorePage
              isLoading={isLoading}
              topics={topics}
              onTopicClick={getTopics}
              onBookmark={toggleBookmark}
            />
          )}
        />
        <Route
          path="/genes"
          render={() => (
            <GenePage
              isLoading={isLoading}
              genes={genes}
              onBookmark={toggleBookmark}
            />
          )}
        />
        <Route
          path="/saved"
          render={() => (
            <SavedPage
              artworks={artworks.filter(artwork => artwork.bookmarked)}
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
              artwork={artworks.find(artwork => artwork.id === match.params.id)}
            />
          )}
        />
        <Route
          path="/RelArtworksThumbPage/:id"
          render={({ match }) => (
            <RelArtworksThumbPage
              onBookmark={toggleBookmark}
              id={match.params.id}
              relatedArtwork={relatedArtworks.find(
                relatedArtwork => relatedArtwork.id === match.params.id
              )}
            />
          )}
        />
        <Route
          path="/gene/:id"
          render={({ match }) => (
            <GeneThumbPage
              onBookmark={toggleBookmark}
              id={match.params.id}
              gene={genes.find(gene => gene.id === match.params.id)}
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
