import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
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
import { Grid, Nav, StyledLink } from './AppStyles'
import ActiveHouse from '../images/ActiveHouse.svg'
import {
  getTrendingArtworkData,
  getTrendingArtistsData,
  getShowData,
  saveArtworkBookmarksToStorage,
  saveArtistBookmarksToStorage,
  getArtworkBookmarksFromStorage,
  getArtistBookmarksFromStorage,
} from '../services'

function App() {
  const [artworks, setArtworks] = useState([])
  const [trendingArtists, setTrendingArtists] = useState([])
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

  async function getData(getter, setter, name) {
    setIsLoading(true)
    try {
      const res = await getter()
      setter(res.data._embedded[name])
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  function getTrendingArtworks() {
    getData(getTrendingArtworkData, setArtworks, 'artworks')
  }

  function getTrendingArtists() {
    getData(getTrendingArtistsData, setTrendingArtists, 'artists')
  }

  function getShows() {
    getData(getShowData, setShows, 'shows')
  }

  function toggleBookmark(array, setter, id) {
    const isBookmarked = array.indexOf(id) !== -1
    setter(isBookmarked ? array.filter(item => item !== id) : [...array, id])
  }

  function toggleArtworkBookmark(id) {
    toggleBookmark(artworkBookmarks, setArtworkBookmarks, id)
  }

  function toggleArtistBookmark(id) {
    toggleBookmark(artistBookmarks, setArtistBookmarks, id)
  }

  useEffect(() => {
    getTrendingArtworks()
  }, [artworks])

  useEffect(() => {
    getTrendingArtists()
  }, [trendingArtists])

  useEffect(() => {
    getShows()
  }, [shows])

  useEffect(() => {
    saveArtworkBookmarksToStorage(artworkBookmarks)
  }, [artworkBookmarks])

  useEffect(() => {
    saveArtistBookmarksToStorage(artistBookmarks)
  }, [artistBookmarks])

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
