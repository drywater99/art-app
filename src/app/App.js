import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
import styled from 'styled-components'
import GlobalStyle from './GlobalStyle'
import PageGene from '../common/PageGene'
import PageArtist from '../common/PageArtist'
import PageArtwork from '../common/PageArtwork'
import HomeMain from '../home/HomeMain'
import ExploreMain from '../explore/ExploreMain'
import SearchTest from '../search/Search'
import GeneMain from '../gene/GeneMain'
import SavedMain from '../saved/SavedMain'
import Icon from './Icon'
import {
  getTopicData,
  getTrendingArtworkData,
  getGeneData,
  getTrendingArtistsData,
  getShowData,
} from '../services'

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
  height: 48px;
  font-weight: bold;
  font-size: 12px;
  color: #383838;
  text-decoration: none;
  &.active {
    text-decoration: underline;
  }
`

function App() {
  const [artworks, setArtworks] = useState([])
  const [trendingArtists, setTrendingArtists] = useState([])
  const [topics, setTopics] = useState([])
  const [genes, setGenes] = useState([])
  const [shows, setShows] = useState([])
  const [isLoading, setIsLoading] = useState()

  async function getShows() {
    setIsLoading(true)
    await getShowData().then(res => {
      const results = res.data._embedded.shows
      setShows(results)
    })
    setIsLoading(false)
  }

  useEffect(() => {
    getShows()
  }, [])

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
              shows={shows.filter(show => !show.bookmarked)}
              trendingArtists={trendingArtists}
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
        {/* <Route
          path="/search"
          render={() => (
            <Search
              artworks={artworks.filter(artwork => artwork.bookmarked)}
              onBookmark={toggleBookmark}
            />
          )}
        /> */}
        <Route
          path="/search"
          render={() => (
            <SearchTest
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
        <Route
          path="/artist/:id"
          render={({ match }) => (
            <PageArtist onBookmark={toggleBookmark} id={match.params.id} />
          )}
        />
        <Route
          path="/gene/:id"
          render={({ match }) => (
            <PageGene onBookmark={toggleBookmark} id={match.params.id} />
          )}
        />
        <Nav>
          <StyledLink exact to="/">
            <Icon name="home" height="35px" width="35px" />
          </StyledLink>
          <StyledLink to="/explore">
            <Icon name="explore" height="35px" width="35px" />
          </StyledLink>
          <StyledLink to="/search/artists">
            <Icon name="search" height="43px" width="43px" />
          </StyledLink>
          <StyledLink to="/saved">
            <Icon name="heart" height="30px" width="30px" />
          </StyledLink>
        </Nav>
        <GlobalStyle />
      </Grid>
    </Router>
  )
}

export default App
