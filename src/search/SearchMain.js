import React, { useState, useEffect } from 'react'
import { BrowserRouter as Route } from 'react-router-dom'
import SwipeableRoutes from 'react-swipeable-routes'
import { debounce } from 'debounce'
import Roller from '../images/Roller.svg'
import Icon from '../common/Icon'
import {
  getSearchQueryArtistData,
  getSearchQueryGeneData,
  getSearchQueryShowData,
  getSuggestionsArtistData,
  getSuggestionsGenesData,
  getSuggestionsShowData,
} from '../services'
import {
  PageGrid,
  Title,
  LoadingContainer,
  StyledForm,
  StyledInput,
  IconContainer,
  LinkContainer,
  StyledTab,
  ActiveUnderline,
} from './SearchMainStyles'
import {
  SearchContentArtists,
  SearchContentGenes,
  SearchContentShows,
} from './SearchMainFunctions'

export default function SearchMain(props) {
  const [dataArtists, setDataArtists] = useState([])
  const [dataGenes, setDataGenes] = useState([])
  const [dataShows, setDataShows] = useState([])
  const [suggestedArtists, setsuggestedArtists] = useState([])
  const [suggestedGenes, setSuggestedGenes] = useState([])
  const [suggestedShows, setSuggestedShows] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchString, setSearchString] = useState('')
  const [isActive, setIsActive] = useState(1)

  const onSearchInputChange = debounce(text => {
    setSearchString(text)
    getSearchResults()
  }, 100)

  function clearInput(e) {
    e.preventDefault()
    setSearchString('')
  }

  useEffect(() => {
    if (props.location.pathname.includes('search/artists')) {
      setIsActive(1)
    } else if (props.location.pathname.includes('search/genre')) {
      setIsActive(2)
    } else if (props.location.pathname.includes('search/shows')) {
      setIsActive(3)
    }
  }, [props.location])

  async function getSearchQuery(getter, setter) {
    setIsLoading(true)
    await getter(searchString)
      .then(res => {
        setter(res.data._embedded.results)
      })
      .catch(err => console.log(err))
    setIsLoading(false)
  }

  function getSearchResults() {
    getSearchQuery(getSearchQueryArtistData, setDataArtists)
    getSearchQuery(getSearchQueryGeneData, setDataGenes)
    getSearchQuery(getSearchQueryShowData, setDataShows)
  }

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

  async function getSuggestionsArtists() {
    getData(getSuggestionsArtistData, setsuggestedArtists, 'artists')
  }

  async function getSuggestionsGenes() {
    getData(getSuggestionsGenesData, setSuggestedGenes, 'genes')
  }

  async function getSuggestionsShows() {
    getData(getSuggestionsShowData, setSuggestedShows, 'shows')
  }

  useEffect(() => {
    getSuggestionsArtists()
  }, [suggestedArtists])

  useEffect(() => {
    getSuggestionsGenes()
  }, [suggestedGenes])

  useEffect(() => {
    getSuggestionsShows()
  }, [suggestedShows])

  return (
    <PageGrid>
      <Title>Search</Title>
      <StyledForm>
        <StyledInput
          placeholder="type something......"
          type="text"
          value={searchString}
          onChange={e => onSearchInputChange(e.target.value)}
        />
        {searchString.length ? (
          <IconContainer onClick={clearInput}>
            <Icon name="cancelSearch" />
          </IconContainer>
        ) : null}
      </StyledForm>
      <LinkContainer>
        <StyledTab onClick={() => setIsActive(1)} to="/search/artists">
          Artists
        </StyledTab>
        <StyledTab onClick={() => setIsActive(2)} to="/search/genre">
          Genre
        </StyledTab>
        <StyledTab onClick={() => setIsActive(3)} to="/search/shows">
          Shows
        </StyledTab>
      </LinkContainer>
      {Underline()}
      {isLoading ? (
        <LoadingContainer>
          <img alt="Roller" src={Roller} />
        </LoadingContainer>
      ) : (
        <SwipeableRoutes>
          <Route exact path="/search/artists" component={ArtistSearch} />
          <Route exact path="/search/genre" component={GeneSearch} />
          <Route exact path="/search/shows" component={ShowSearch} />
        </SwipeableRoutes>
      )}
    </PageGrid>
  )

  function Underline() {
    return (
      <ActiveUnderline
        style={
          isActive === 1
            ? { 'margin-left': '0' }
            : isActive === 2
            ? { 'margin-left': '33%' }
            : isActive === 3
            ? { 'margin-left': '66%' }
            : null
        }
      />
    )
  }

  function ArtistSearch() {
    return (
      <SearchContentArtists
        searchString={searchString}
        isLoading={isLoading}
        suggestedArtists={suggestedArtists}
        dataArtists={dataArtists}
        style={{ height: '100vh', 'overflow-y': 'scroll' }}
      />
    )
  }

  function GeneSearch() {
    return (
      <SearchContentGenes
        searchString={searchString}
        isLoading={isLoading}
        suggestedGenes={suggestedGenes}
        dataGenes={dataGenes}
        style={{ height: '100vh', 'overflow-y': 'scroll' }}
      />
    )
  }

  function ShowSearch() {
    return (
      <SearchContentShows
        searchString={searchString}
        isLoading={isLoading}
        suggestedShows={suggestedShows}
        dataShows={dataShows}
        style={{ height: '100vh', 'overflow-y': 'scroll' }}
      />
    )
  }
}
