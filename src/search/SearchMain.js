import React, { useState, useEffect } from 'react'
import { BrowserRouter as Route } from 'react-router-dom'
import SwipeableRoutes from 'react-swipeable-routes'
import { debounce } from 'debounce'
import Roller from '../images/Roller.svg'
import Icon from '../app/Icon'
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
  StyledLink,
  Hr,
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
    getSearchQuery()
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

  async function getSearchQuery() {
    setIsLoading(true)
    await getSearchQueryArtistData(searchString)
      .then(res => {
        setDataArtists(res.data._embedded.results)
      })
      .catch(err => console.log(err))
    await getSearchQueryGeneData(searchString)
      .then(res => {
        setDataGenes(res.data._embedded.results)
      })
      .catch(err => console.log(err))
    await getSearchQueryShowData(searchString)
      .then(res => {
        setDataShows(res.data._embedded.results)
      })
      .catch(err => console.log(err))
    setIsLoading(false)
  }

  async function getSuggestionsArtists() {
    setIsLoading(true)
    await getSuggestionsArtistData()
      .then(res => {
        setsuggestedArtists(res.data._embedded.artists)
      })
      .catch(err => console.log(err))
    setIsLoading(false)
  }

  async function getSuggestionsGenes() {
    setIsLoading(true)
    await getSuggestionsGenesData()
      .then(res => {
        setSuggestedGenes(res.data._embedded.genes)
      })
      .catch(err => console.log(err))
    setIsLoading(false)
  }

  async function getSuggestionsShows() {
    setIsLoading(true)
    await getSuggestionsShowData()
      .then(res => {
        setSuggestedShows(res.data._embedded.shows)
      })
      .catch(err => console.log(err))
    setIsLoading(false)
  }

  useEffect(() => {
    getSuggestionsArtists()
    getSuggestionsGenes()
    getSuggestionsShows()
  }, [])

  const ArtistSearch = () => (
    <SearchContentArtists
      searchString={searchString}
      isLoading={isLoading}
      suggestedArtists={suggestedArtists}
      dataArtists={dataArtists}
      style={{ height: '100vh', 'overflow-y': 'scroll' }}
    />
  )

  const GeneSearch = () => (
    <SearchContentGenes
      searchString={searchString}
      isLoading={isLoading}
      suggestedGenes={suggestedGenes}
      dataGenes={dataGenes}
      style={{ height: '100vh', 'overflow-y': 'scroll' }}
    />
  )

  const ShowSearch = () => (
    <SearchContentShows
      searchString={searchString}
      isLoading={isLoading}
      suggestedShows={suggestedShows}
      dataShows={dataShows}
      style={{ height: '100vh', 'overflow-y': 'scroll' }}
    />
  )

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
            <Icon name="cancel" fill={'#949494'} height="20px" width="20px" />
          </IconContainer>
        ) : null}
      </StyledForm>
      <LinkContainer>
        <StyledLink onClick={() => setIsActive(1)} to="/search/artists">
          Artists
        </StyledLink>
        <StyledLink onClick={() => setIsActive(2)} to="/search/genre">
          Genre
        </StyledLink>
        <StyledLink onClick={() => setIsActive(3)} to="/search/shows">
          Shows
        </StyledLink>
      </LinkContainer>
      <Hr
        style={
          isActive === 1
            ? { margin: '-1% 0 0 0' }
            : isActive === 2
            ? { margin: '-1% 0 0 33%' }
            : isActive === 3
            ? { margin: '-1% 0 0 66%' }
            : null
        }
      />
      {isLoading ? (
        <LoadingContainer>
          <img alt="Roller" src={Roller} width="60px" height="60px" />
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
}
