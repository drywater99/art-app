import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import SwipeableRoutes from 'react-swipeable-routes'
import styled from 'styled-components'
import Title from '../common/Title'
import SearchThumbArtist from './SearchThumbArtist'
import SearchThumb from './SearchThumb'
import Roller from '../images/Roller.svg'
import Scope from '../images/Scope.svg'
import {
  getSearchQueryArtistData,
  getSearchQueryGeneData,
  getSearchQueryShowData,
  getSuggestionsArtistData,
  getSuggestionsGenesData,
  getSuggestionsShowData,
} from '../services'

const PageGrid = styled.div`
  display: grid;
  grid-template-rows: auto auto auto 1fr;
  overflow: hidden;
`
const HeadlineContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 20px;
  padding: 25px 25px 10px 25px;
`

const ResultContainer = styled.section`
  display: grid;
  grid-template-columns: 150px 150px;
  grid-template-rows: auto;
  grid-column-gap: 21px;
  grid-row-gap: 22px;
  padding: 25px;
  overflow-y: scroll;
`

const LoadingContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  margin: 10px 0 10px 0;
`

const StyledInput = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ededed;
  background-image: url(${Scope});
  background-size: 6%;
  background-position: 295px 10px;
  background-repeat: no-repeat;
  width: 90vw;
  height: 40px;
  padding: 0 16px 4px 16px;
  border-radius: 25px;
  border-style: none;
  outline: none;
  font-size: 18px;
  font-weight: regular;
  color: #bababa;
  ::placeholder {
    color: #949494;
  }
`

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-bottom: 1px solid #d0d0d0;
  margin: 0 20px;
`

const StyledLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  color: #949494;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: bold;
  font-size: 16px;
  text-decoration: none;
  width: 150%;
  &.active {
    border-bottom: 2px solid #383838;
    color: #383838;
    padding: 9px;
  }
`

export default function Search() {
  const [dataArtists, setDataArtists] = useState([])
  const [dataGenes, setDataGenes] = useState([])
  const [dataShows, setDataShows] = useState([])
  const [suggestedArtists, setsuggestedArtists] = useState([])
  const [suggestedGenes, setSuggestedGenes] = useState([])
  const [suggestedShows, setSuggestedShows] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchString, setSearchString] = useState(null)

  console.log(dataShows)

  function onSearchInputChange(e) {
    //debounce
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
    getSuggestionsArtists()
  }, [])

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
                image={
                  dataArtist._links.thumbnail.href
                    ? dataArtist._links.thumbnail.href
                    : 'https://via.placeholder.com/150'
                }
                title={dataArtist.title}
                key={dataArtist._links.self.href}
                id={dataArtist._links.self.href.replace(
                  'https://api.artsy.net/api/genes/',
                  ''
                )}
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
                image={
                  dataShow._links.thumbnail.href
                    ? dataShow._links.thumbnail.href
                    : 'https://via.placeholder.com/150'
                }
                title={dataShow.title}
                key={dataShow._links.self.href}
                id={dataShow._links.self.href.replace(
                  'https://api.artsy.net/api/shows/',
                  ''
                )}
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

  const ArtistSearch = () => (
    <SearchContentArtists style={{ height: '100vh', 'overflow-y': 'scroll' }} />
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
            <Route path="/search/artists" component={ArtistSearch} />
            <Route path="/search/genre" component={GeneSearch} />
            <Route path="/search/shows" component={ShowSearch} />
          </SwipeableRoutes>
        )}
      </PageGrid>
    </Router>
  )
}
