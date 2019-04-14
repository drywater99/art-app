import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
import ScrollMemory from 'react-router-scroll-memory'
import styled from 'styled-components'
import GlobalStyle from './GlobalStyle'
import PageGene from '../common/PageGene'
import PageShow from '../common/PageShow'
import PageArtist from '../common/PageArtist'
import PageArtwork from '../common/PageArtwork'
import HomeMain from '../home/HomeMain'
import ExploreMain from '../explore/ExploreMain'
import SearchMain from '../search/SearchMain'
import SavedMain from '../saved/SavedMain'
import Icon from './Icon'
import ActiveHouse from '../images/ActiveHouse.svg'
import {
  getTopicData,
  getTrendingArtworkData,
  getGeneData,
  getTrendingArtistsData,
  getShowData,
  saveArtworkBookmarksToStorage,
  saveArtistBookmarksToStorage,
  getArtworkBookmarksFromStorage,
  getArtistBookmarksFromStorage,
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
  opacity: 50%;
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
  const [showLogo, setShowLogo] = useState(true)
  const [artworkBookmarks, setArtworkBookmarks] = useState(
    getArtworkBookmarksFromStorage() || []
  )
  const [artistBookmarks, setArtistBookmarks] = useState(
    getArtistBookmarksFromStorage() || []
  )
  const [navClickState, setNavClickState] = useState(1)

  async function getShows() {
    setIsLoading(true)
    await getShowData()
      .then(res => {
        const results = res.data._embedded.shows
        setShows(results)
      })
      .catch(err => console.log(err))
    setIsLoading(false)
  }

  async function getTrendingArtists() {
    setIsLoading(true)
    await getTrendingArtistsData()
      .then(res => {
        const results = res.data._embedded.artists
        setTrendingArtists(results)
      })
      .catch(err => console.log(err))
    setIsLoading(false)
  }

  async function getTrendingArtworks() {
    setIsLoading(true)
    await getTrendingArtworkData()
      .then(res => {
        const results = res.data._embedded.artworks
        setArtworks(results)
      })
      .catch(err => console.log(err))
    setIsLoading(false)
  }

  async function getGenes() {
    setIsLoading(true)
    await getGeneData()
      .then(res => {
        const results = res.data._embedded.genes
        setGenes(results)
      })
      .catch(err => console.log(err))
    setIsLoading(false)
  }

  async function getTopics(url) {
    setIsLoading(true)
    await getTopicData(url)
      .then(res => {
        const results =
          res.data._embedded.artworks || res.data._embedded.artists
        setTopics(results)
      })
      .catch(err => console.log(err))
    setIsLoading(false)
  }

  useEffect(() => {
    getShows()
    getTrendingArtists()
    getTrendingArtworks()
    getGenes()
    getTopics()
  }, [])

  useEffect(() => {
    saveArtworkBookmarksToStorage(artworkBookmarks)
  }, [artworkBookmarks])

  function toggleArtworkBookmark(id) {
    const isBookmarked = artworkBookmarks.indexOf(id) !== -1
    setArtworkBookmarks(
      isBookmarked
        ? artworkBookmarks.filter(item => item !== id)
        : [...artworkBookmarks, id]
    )
  }

  useEffect(() => {
    saveArtistBookmarksToStorage(artistBookmarks)
  }, [artistBookmarks])

  function toggleArtistBookmark(id) {
    const isBookmarked = artistBookmarks.indexOf(id) !== -1
    setArtistBookmarks(
      isBookmarked
        ? artistBookmarks.filter(item => item !== id)
        : [...artistBookmarks, id]
    )
  }

  return (
    <Router>
      <Grid>
        <ScrollMemory />
        <Route
          exact
          path="/"
          render={() => (
            <HomeMain
              // showLogo={showLogo}
              setShowLogo={setShowLogo}
              isLoading={isLoading}
              artworks={artworks}
              shows={shows.filter(show => !show.bookmarked)}
              trendingArtists={trendingArtists}
              onBookmark={toggleArtworkBookmark}
            />
          )}
        />
        <Route
          path="/explore/"
          render={props => (
            <ExploreMain
              {...props}
              isLoading={isLoading}
              topics={topics}
              onTopicClick={getTopics}
              onBookmark={toggleArtworkBookmark}
            />
          )}
        />
        <Route
          path="/search"
          render={props => (
            <SearchMain
              {...props}
              artworks={artworks.filter(artwork => artwork.bookmarked)}
            />
          )}
        />
        <Route
          path="/saved"
          render={props => (
            <SavedMain
              props={props}
              artworkBookmarks={artworkBookmarks}
              artistBookmarks={artistBookmarks}
              onBookmark={toggleArtworkBookmark}
            />
          )}
        />
        <Route
          path="/artwork/:id"
          render={props => (
            <PageArtwork
              props={props}
              bookmarked={
                artworkBookmarks &&
                artworkBookmarks.indexOf(props.match.params.id) !== -1
              }
              onBookmark={toggleArtworkBookmark}
              history={props.history}
              id={props.match.params.id}
            />
          )}
        />
        <Route
          path="/artist/:id"
          render={props => (
            <PageArtist
              props={props}
              bookmarked={
                artistBookmarks &&
                artistBookmarks.indexOf(props.match.params.id) !== -1
              }
              onBookmark={toggleArtistBookmark}
              id={props.match.params.id}
            />
          )}
        />
        <Route
          path="/gene/:id"
          render={props => (
            <PageGene
              onBookmark={toggleArtworkBookmark}
              id={props.match.params.id}
            />
          )}
        />
        <Route
          path="/show/:id"
          render={props => (
            <PageShow
              props={props}
              onBookmark={toggleArtworkBookmark}
              id={props.match.params.id}
            />
          )}
        />
        <Nav>
          <StyledLink exact to="/" onClick={() => setNavClickState(1)}>
            {navClickState === 1 ? (
              <img alt="ActiveHouse" src={ActiveHouse} />
            ) : (
              <Icon fill={'#949494'} name="home" height="36px" width="36px" />
            )}
          </StyledLink>
          <StyledLink to="/explore/all" onClick={() => setNavClickState(2)}>
            {navClickState === 2 ? (
              <Icon
                fill={'#383838'}
                name="explore_active"
                height="35px"
                width="35px"
              />
            ) : (
              <Icon
                fill={'#949494'}
                name="explore"
                height="35px"
                width="35px"
              />
            )}
          </StyledLink>
          <StyledLink to="/search/artists" onClick={() => setNavClickState(3)}>
            {navClickState === 3 ? (
              <Icon
                fill={'#383838'}
                name="search_active"
                height="44px"
                width="44px"
              />
            ) : (
              <Icon fill={'#949494'} name="search" height="44px" width="44px" />
            )}
          </StyledLink>
          <StyledLink to="/saved/artworks" onClick={() => setNavClickState(4)}>
            {navClickState === 4 ? (
              <Icon
                fill={'#383838'}
                name="heart_active"
                height="30px"
                width="30px"
              />
            ) : (
              <Icon fill={'#949494'} name="heart" height="30px" width="30px" />
            )}
          </StyledLink>
        </Nav>
        <GlobalStyle />
      </Grid>
    </Router>
  )
}

export default App
