import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import SwipeableRoutes from 'react-swipeable-routes'
import SearchThumbArtist from './SearchThumbArtist'
import SearchThumb from './SearchThumb'
import Roller from '../images/Roller.svg'
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
  HeadlineContainer,
  ResultContainer,
  LoadingContainer,
  StyledForm,
  StyledInput,
  LinkContainer,
  StyledLink,
} from './SavedMainStyles'

export default function SearchMain(props) {
  const [dataArtists, setDataArtists] = useState([])
  const [dataGenes, setDataGenes] = useState([])
  const [dataShows, setDataShows] = useState([])
  const [suggestedArtists, setsuggestedArtists] = useState([])
  const [suggestedGenes, setSuggestedGenes] = useState([])
  const [suggestedShows, setSuggestedShows] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchString, setSearchString] = useState(null)
  const [locationState, setLocationState] = useState(props.location)

  function onSearchInputChange(e) {
    setSearchString(e.target.value)
    getSearchQuery()
  }

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
  useEffect(() => {
    setLocationState(props.location)
    getSuggestionsArtists()
  }, [locationState !== props.location])

  async function getSuggestionsGenes() {
    setIsLoading(true)
    await getSuggestionsGenesData()
      .then(res => {
        setSuggestedGenes(res.data._embedded.genes)
      })
      .catch(err => console.log(err))
    setIsLoading(false)
  }
  useEffect(() => {
    getSuggestionsGenes()
  }, [])

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
    getSuggestionsShows()
  }, [])

  function SearchContentArtists() {
    if (!searchString) {
      return (
        <React.Fragment>
          {isLoading ? (
            <LoadingContainer>
              <img alt="Roller" src={Roller} width="60px" height="60px" />
            </LoadingContainer>
          ) : (
            <React.Fragment>
              <HeadlineContainer>
                <h3>Suggested</h3>
              </HeadlineContainer>
              <ResultContainer>
                {suggestedArtists.map(suggestedArtist => (
                  <React.Fragment key={suggestedArtist.id}>
                    <SearchThumbArtist
                      image={suggestedArtist._links.image.href.replace(
                        '{image_version}',
                        'large'
                      )}
                      name={suggestedArtist.name}
                      key={suggestedArtist.id}
                      id={suggestedArtist.id}
                      location={props.location}
                      urlCategory="artist"
                    />
                  </React.Fragment>
                ))}
              </ResultContainer>
            </React.Fragment>
          )}
        </React.Fragment>
      )
    } else if (dataArtists.length > 0) {
      return (
        <ResultContainer>
          {dataArtists.map(dataArtist => (
            <React.Fragment key={dataArtist._links.self.href}>
              <SearchThumbArtist
                image={dataArtist._links.thumbnail.href}
                title={dataArtist.title}
                key={dataArtist._links.self.href}
                id={dataArtist._links.self.href.replace(
                  'https://api.artsy.net/api/artists/',
                  ''
                )}
                urlCategory="artist"
              />
            </React.Fragment>
          ))}
        </ResultContainer>
      )
    } else {
      return (
        <HeadlineContainer>
          <h3>No results found</h3>
        </HeadlineContainer>
      )
    }
  }

  function SearchContentGenes() {
    if (!searchString) {
      return (
        <React.Fragment>
          {isLoading ? (
            <LoadingContainer>
              <img alt="Roller" src={Roller} width="60px" height="60px" />
            </LoadingContainer>
          ) : (
            <React.Fragment>
              <HeadlineContainer>
                <h3>Suggested</h3>
              </HeadlineContainer>
              <ResultContainer>
                {suggestedGenes.map(suggestedGene => (
                  <React.Fragment key={suggestedGene.id}>
                    <SearchThumb
                      image={suggestedGene._links.image.href.replace(
                        '{image_version}',
                        'square500'
                      )}
                      name={suggestedGene.name}
                      key={suggestedGene.id}
                      id={suggestedGene.id}
                      urlCategory="gene"
                    />
                  </React.Fragment>
                ))}
              </ResultContainer>
            </React.Fragment>
          )}
        </React.Fragment>
      )
    } else if (dataGenes.length > 0) {
      return (
        <ResultContainer>
          {dataGenes.map(dataGene => (
            <React.Fragment key={dataGene._links.self.href}>
              <SearchThumb
                image={dataGene._links.thumbnail.href}
                title={dataGene.title}
                key={dataGene._links.self.href}
                id={dataGene._links.self.href.replace(
                  'https://api.artsy.net/api/genes/',
                  ''
                )}
                urlCategory="gene"
              />
            </React.Fragment>
          ))}
        </ResultContainer>
      )
    } else {
      return (
        <HeadlineContainer>
          <h3>No results found</h3>
        </HeadlineContainer>
      )
    }
  }

  function SearchContentShows() {
    if (!searchString) {
      return (
        <React.Fragment>
          {isLoading ? (
            <LoadingContainer>
              <img alt="Roller" src={Roller} width="60px" height="60px" />
            </LoadingContainer>
          ) : (
            <React.Fragment>
              <HeadlineContainer>
                <h3>Suggested</h3>
              </HeadlineContainer>
              <ResultContainer>
                {suggestedShows.map(suggestedShow => (
                  <React.Fragment key={suggestedShow.id}>
                    <SearchThumb
                      name={suggestedShow.name}
                      image={suggestedShow._links.thumbnail.href}
                      key={suggestedShow.id}
                      id={suggestedShow.id}
                      urlCategory="show"
                    />
                  </React.Fragment>
                ))}
              </ResultContainer>
            </React.Fragment>
          )}
        </React.Fragment>
      )
    } else if (dataShows.length > 0) {
      return (
        <ResultContainer>
          {dataShows.map(dataShow => (
            <React.Fragment key={dataShow._links.self.href}>
              <SearchThumb
                image={dataShow._links.thumbnail.href}
                title={dataShow.title}
                key={dataShow._links.self.href}
                id={dataShow._links.self.href.replace(
                  'https://api.artsy.net/api/shows/',
                  ''
                )}
                urlCategory="show"
              />
            </React.Fragment>
          ))}
        </ResultContainer>
      )
    } else {
      return (
        <HeadlineContainer>
          <h3>No results found</h3>
        </HeadlineContainer>
      )
    }
  }

  const ArtistSearch = props => (
    <SearchContentArtists
      location={props.location}
      style={{ height: '100vh', 'overflow-y': 'scroll' }}
    />
  )

  const GeneSearch = () => (
    <SearchContentGenes style={{ height: '100vh', 'overflow-y': 'scroll' }} />
  )

  const ShowSearch = () => (
    <SearchContentShows style={{ height: '100vh', 'overflow-y': 'scroll' }} />
  )

  return (
    <Router>
      <PageGrid>
        <Title>Search</Title>
        <StyledForm>
          <StyledInput
            placeholder="type something......"
            type="text"
            onChange={onSearchInputChange}
          />
        </StyledForm>
        <LinkContainer>
          <StyledLink to="/search/artists">Artists</StyledLink>
          <StyledLink to="/search/genre">Genre</StyledLink>
          <StyledLink to="/search/shows">Shows</StyledLink>
        </LinkContainer>
        {isLoading ? (
          <LoadingContainer>
            <img alt="Roller" src={Roller} width="60px" height="60px" />
          </LoadingContainer>
        ) : (
          <SwipeableRoutes>
            <Route
              exact
              path="/search/artists"
              location={props.location}
              component={ArtistSearch}
            />
            <Route exact path="/search/genre" component={GeneSearch} />
            <Route exact path="/search/shows" component={ShowSearch} />
          </SwipeableRoutes>
        )}
      </PageGrid>
    </Router>
  )
}