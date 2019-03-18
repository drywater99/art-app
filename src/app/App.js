import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
import styled from 'styled-components'
import GlobalStyle from './GlobalStyle'
import HomeMain from '../home/HomeMain'
import HomePageArtwork from '../home/HomePageArtwork'
import ExploreMain from '../explore/ExploreMain'
import ExplorePage from '../explore/ExplorePage'
import GeneMain from '../gene/GeneMain'
import GenePage from '../gene/GenePage'
import SavedMain from '../saved/SavedMain'
import {
  getTopicData,
  getTrendingArtworkData,
  getGeneData,
  getTrendingArtistsData,
} from '../services'

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
  color: #efefef;
  border-top: #949494 solid 1px;
`

const StyledLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 12px;
  margin: 15px 24px;
  color: #383838;
  text-decoration: none;
  &.active {
    text-decoration: underline;
  }
`

function App(homeArtists) {
  const [artworks, setArtworks] = useState([])
  const [trendingArtists, setTrendingArtists] = useState([])
  const [topics, setTopics] = useState([])
  const [genes, setGenes] = useState([])
  const [isLoading, setIsLoading] = useState()

  async function getTrendingArtists() {
    setIsLoading(true)
    await getTrendingArtistsData().then(res => {
      const results = res.data._embedded.artists
      setTrendingArtists(results)
    })
    setIsLoading(false)
  }

  useEffect(() => {
    getTrendingArtists()
  }, [])

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

  console.log(trendingArtists, artworks)

  return (
    <Router>
      <Grid>
        <Route
          exact
          path="/"
          render={() => (
            <HomeMain
              isLoading={isLoading}
              artworks={artworks.filter(artwork => !artwork.bookmarked)}
              onBookmark={toggleBookmark}
            />
          )}
        />
        <Route
          path="/explore"
          render={() => (
            <ExploreMain
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
            <GeneMain
              isLoading={isLoading}
              genes={genes}
              onBookmark={toggleBookmark}
            />
          )}
        />
        <Route
          path="/saved"
          render={() => (
            <SavedMain
              artworks={artworks.filter(artwork => artwork.bookmarked)}
              onBookmark={toggleBookmark}
            />
          )}
        />
        <Route
          path="/artwork/:id"
          render={({ match }) => (
            <HomePageArtwork
              onBookmark={toggleBookmark}
              id={match.params.id}
              artwork={artworks.find(artwork => artwork.id === match.params.id)}
            />
          )}
        />
        {/* <Route
          path="/home/artist/:id"
          render={({ match }) => (
            <HomePageArtist
              onBookmark={toggleBookmark}
              id={match.params.id}
              homeArtist={homeArtists.find(
                homeArtist => homeArtist.id === match.params.id
              )}
            />
          )}
        /> */}
        <Route
          path="/gene/:id"
          render={({ match }) => (
            <GenePage
              onBookmark={toggleBookmark}
              id={match.params.id}
              gene={genes.find(gene => gene.id === match.params.id)}
            />
          )}
        />
        <Route
          path="/topic/:id"
          render={({ match }) => (
            <ExplorePage
              onBookmark={toggleBookmark}
              id={match.params.id}
              topic={topics.find(topic => topic.id === match.params.id)}
            />
          )}
        />

        <Route path="/artsy" component={ArtsyCards} />
        <Nav>
          <StyledLink exact to="/">
            Home
          </StyledLink>
          <StyledLink to="/explore">Explore</StyledLink>
          <StyledLink to="/genes">Category</StyledLink>
          <StyledLink to="/saved">Saved</StyledLink>
        </Nav>
        <GlobalStyle />
      </Grid>
    </Router>
  )
}

export default App
