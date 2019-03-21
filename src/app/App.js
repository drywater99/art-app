import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
import styled from 'styled-components'
import GlobalStyle from './GlobalStyle'
import PageGene from '../common/PageGene'
import PageArtist from '../common/PageArtist'
import PageArtwork from '../common/PageArtwork'
import HomeMain from '../home/HomeMain'
import ExploreMain from '../explore/ExploreMain'
import Search from '../explore/Search'
import GeneMain from '../gene/GeneMain'
import SavedMain from '../saved/SavedMain'
import {
  getTopicData,
  getTrendingArtworkData,
  getGeneData,
  getTrendingArtistsData,
} from '../services'
import ArtsyCards from '../testapi/ArtsyCards'
//import Icon from './Icon'

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
          path="/search"
          render={() => (
            <Search
              artworks={artworks.filter(artwork => artwork.bookmarked)}
              onBookmark={toggleBookmark}
            />
          )}
        />
        <Route
          path="/artwork/:id"
          render={props => (
            <PageArtwork
              props={props}
              onBookmark={toggleBookmark}
              id={props.match.params.id}
            />
          )}
        />
        {/* <Route
          path="/artwork/:id"
          render={({ match }) => (
            <PageArtwork onBookmark={toggleBookmark} id={match.params.id} />
          )}
        /> */}
        <Route
          path="/artist/:id"
          render={({ match }) => (
            <PageArtist onBookmark={toggleBookmark} id={match.params.id} />
          )}
        />
        <Route
          path="/gene/:id"
          render={({ match }) => (
            <PageGene
              onBookmark={toggleBookmark}
              id={match.params.id}
              //gene={genes.find(gene => gene.id === match.params.id)}
            />
          )}
        />
        <Route path="/artsy" component={ArtsyCards} />
        <Nav>
          <StyledLink exact to="/">
            HOME
            {/* <Icon name="home" height="20px" width="20px" /> */}
          </StyledLink>
          <StyledLink to="/explore">EXPLORE</StyledLink>
          <StyledLink to="/genes">GENRE</StyledLink>
          <StyledLink to="/search">SEARCH</StyledLink>
          {/* <StyledLink to="/saved">SAVED</StyledLink> */}
        </Nav>
        <GlobalStyle />
      </Grid>
    </Router>
  )
}

export default App
