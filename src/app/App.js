import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
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
import {
  getTopicData,
  getTrendingArtworkData,
  getGeneData,
  getTrendingArtistsData,
  getShowData,
  saveBookmarksToStorage,
  getBookmarksFromStorage,
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
  const [bookmarks, setBookmarks] = useState(getBookmarksFromStorage() || [])
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

  useEffect(() => {
    getShows()
  }, [])

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

  useEffect(() => {
    getTrendingArtists()
  }, [])

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

  useEffect(() => {
    getTrendingArtworks()
  }, [])

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

  useEffect(() => {
    getGenes()
  }, [])

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
    getTopics()
  }, [])

  useEffect(() => {
    saveBookmarksToStorage(bookmarks)
  }, [bookmarks])

  function toggleBookmark(id) {
    const isBookmarked = bookmarks.indexOf(id) !== -1
    setBookmarks(
      isBookmarked ? bookmarks.filter(item => item !== id) : [...bookmarks, id]
    )
  }

  return (
    <Router>
      <Grid>
        <Route
          exact
          path="/"
          render={() => (
            <HomeMain
              showLogo={showLogo}
              setShowLogo={setShowLogo}
              isLoading={isLoading}
              artworks={artworks}
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
          path="/search"
          render={props => (
            <SearchMain
              props={props}
              artworks={artworks.filter(artwork => artwork.bookmarked)}
            />
          )}
        />
        <Route
          path="/saved"
          render={() => (
            <SavedMain
              bookmarks={bookmarks}
              // artworks={bookmarks
              //   .map(id => artworks.find(item => item.id === id))
              //   .filter(Boolean)}
              onBookmark={toggleBookmark}
            />
          )}
        />
        <Route
          path="/artwork/:id"
          render={props => (
            <PageArtwork
              props={props}
              bookmarked={
                bookmarks && bookmarks.indexOf(props.match.params.id) !== -1
              }
              onBookmark={toggleBookmark}
              id={props.match.params.id}
            />
          )}
        />
        <Route
          path="/artist/:id"
          render={props => (
            <PageArtist
              bookmarked={
                bookmarks && bookmarks.indexOf(props.match.params.id) !== -1
              }
              onBookmark={toggleBookmark}
              id={props.match.params.id}
            />
          )}
        />
        <Route
          path="/gene/:id"
          render={props => (
            <PageGene onBookmark={toggleBookmark} id={props.match.params.id} />
          )}
        />
        <Route
          path="/show/:id"
          render={props => (
            <PageShow
              props={props}
              onBookmark={toggleBookmark}
              id={props.match.params.id}
            />
          )}
        />
        <Nav>
          <StyledLink exact to="/" onClick={() => setNavClickState(1)}>
            <Icon
              fill={navClickState === 1 ? '#383838' : '#949494'}
              name="home"
              height="35px"
              width="35px"
            />
          </StyledLink>
          <StyledLink to="/explore" onClick={() => setNavClickState(2)}>
            <Icon
              fill={navClickState === 2 ? '#383838' : '#949494'}
              name="explore"
              height="35px"
              width="35px"
            />
          </StyledLink>
          <StyledLink to="/search/artists" onClick={() => setNavClickState(3)}>
            <Icon
              fill={navClickState === 3 ? '#383838' : '#949494'}
              name="search"
              height="43px"
              width="43px"
            />
          </StyledLink>
          <StyledLink to="/saved" onClick={() => setNavClickState(4)}>
            <Icon
              fill={navClickState === 4 ? '#383838' : '#949494'}
              name="heart"
              height="30px"
              width="30px"
            />
          </StyledLink>
        </Nav>
        <GlobalStyle />
      </Grid>
    </Router>
  )
}

export default App
