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
  const [nav, setNav] = useState(1)

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
        <Route exact path="/" render={HomeRoute} />
        <Route path="/explore/" render={ExploreRoute} />
        <Route path="/search" render={SearchRoute} />
        <Route path="/saved" render={SavedRoute} />
        <Route path="/artwork/:id" render={ArtworkRoute} />
        <Route path="/artist/:id" render={ArtistRoute} />
        <Route path="/gene/:id" render={GeneRoute} />
        <Route path="/show/:id" render={ShowRoute} />
        <Nav>
          <StyledLink exact to="/" onClick={() => setNav(1)}>
            <NavHome />
          </StyledLink>
          <StyledLink to="/explore/all" onClick={() => setNav(2)}>
            {NavIcon(2, 'explore')}
          </StyledLink>
          <StyledLink to="/search/artists" onClick={() => setNav(3)}>
            {NavIcon(3, 'search')}
          </StyledLink>
          <StyledLink to="/saved/artworks" onClick={() => setNav(4)}>
            {NavIcon(4, 'heart')}
          </StyledLink>
        </Nav>
        <GlobalStyle />
      </Grid>
    </Router>
  )

  function HomeRoute() {
    return (
      <HomeMain
        showLogo={showLogo}
        setShowLogo={setShowLogo}
        isLoading={isLoading}
        artworks={artworks}
        shows={shows.filter(show => !show.bookmarked)}
        trendingArtists={trendingArtists}
        onBookmark={toggleArtworkBookmark}
      />
    )
  }

  function ExploreRoute(props) {
    return (
      <ExploreMain
        {...props}
        isLoading={isLoading}
        onBookmark={toggleArtworkBookmark}
      />
    )
  }

  function SearchRoute(props) {
    return (
      <SearchMain
        {...props}
        artworks={artworks.filter(artwork => artwork.bookmarked)}
      />
    )
  }

  function SavedRoute(props) {
    return (
      <SavedMain
        props={props}
        artworkBookmarks={artworkBookmarks}
        artistBookmarks={artistBookmarks}
        onBookmark={toggleArtworkBookmark}
      />
    )
  }

  function ArtworkRoute(props) {
    return (
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
    )
  }

  function ArtistRoute(props) {
    return (
      <PageArtist
        props={props}
        bookmarked={
          artistBookmarks &&
          artistBookmarks.indexOf(props.match.params.id) !== -1
        }
        onBookmark={toggleArtistBookmark}
        id={props.match.params.id}
      />
    )
  }

  function GeneRoute(props) {
    return (
      <PageGene onBookmark={toggleArtworkBookmark} id={props.match.params.id} />
    )
  }

  function ShowRoute(props) {
    return (
      <PageShow
        props={props}
        onBookmark={toggleArtworkBookmark}
        id={props.match.params.id}
      />
    )
  }

  function NavHome() {
    return nav === 1 ? (
      <img alt="ActiveHouse" src={ActiveHouse} />
    ) : (
      <Icon fill={'#949494'} name="home" />
    )
  }

  function NavIcon(state, name) {
    return nav === state ? (
      <Icon fill={'#383838'} name={`${name}_active`} />
    ) : (
      <Icon fill={'#949494'} name={`${name}`} />
    )
  }
}

export default App
