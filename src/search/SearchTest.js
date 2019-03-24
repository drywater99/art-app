import React, { useState, useEffect } from 'react'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import SwipeableRoutes from 'react-swipeable-routes'

import styled from 'styled-components'
import Title from '../common/Title'
import { getSearchQueryData, getSuggestionsData } from '../services'
import ThumbSearch from './ThumbSearch'

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
  grid-row-gap: 18px;
  padding: 25px;
  overflow-y: scroll;
`

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  margin: 10px 0 10px 0;
`

const StyledInput = styled.input`
  background-color: #ededed;
  width: 85vw;
  height: 40px;
  border-radius: 15px;
  font-size: 18px;
  font-weight: bold;
  color: #bababa;
`

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-bottom: 1px solid #d0d0d0;
  padding: 0 20px;
`

const StyledLink = styled(Link)`
  color: ${link => (link.active ? '#383838' : '#949494')};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: bold;
  font-size: 16px;
  text-decoration: none;
  border-bottom: ${link => (link.active ? '4px solid #383838' : 'null')};
  &.active {
    text-decoration: underline;
  }
  margin: 10px 20px 10px 20px;
`

export default function SearchTest() {
  const [dataArtists, setDataArtists] = useState([])
  const [dataGenes, setDataGenes] = useState([])
  const [dataShows, setDataShows] = useState([])
  const [suggestedArtists, setsuggestedArtists] = useState([])
  const [suggestedGenes, setSuggestedGenes] = useState([])
  const [suggestedShows, setSuggestedShows] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchString, setSearchString] = useState(null)
  const [searchOption, setSearchOption] = useState('artist')

  console.log(suggestedArtists)

  async function onSearchOptionClick(option) {
    setSearchOption(option)

    getSearchQuery()
  }

  function onSearchInputChange(e) {
    setSearchString(e.target.value)
    getSearchQuery()
  }

  async function getSearchQuery() {
    setIsLoading(true)
    if (searchOption === 'artist') {
      const urlString = `https://api.artsy.net/api/search?q=${searchString}&offset=0&size=10&type=artist`
      await getSearchQueryData(urlString)
        .then(res => {
          setDataArtists(res.data._embedded.results)
        })
        .catch(err => console.log(err))
    } else if (searchOption === 'gene') {
      const urlString = `https://api.artsy.net/api/search?q=${searchString}
      &offset=0&size=10&type=gene`
      setIsLoading(true)
      await getSearchQueryData(urlString)
        .then(res => {
          setDataGenes(res.data._embedded.results)
        })
        .catch(err => console.log(err))
    } else if (searchOption === 'show') {
      const urlString = `https://api.artsy.net/api/search?q=${searchString}&offset=0&size=10&type=show`
      setIsLoading(true)
      await getSearchQueryData(urlString)
        .then(res => {
          setDataShows(res.data._embedded.results)
        })
        .catch(err => console.log(err))
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getSearchQuery()
  }, [])

  async function getSuggestionsArtists() {
    const urlString = `https://api.artsy.net/api/artists?size=10&sort=-trending`
    await getSuggestionsData(urlString)
      .then(res => {
        setsuggestedArtists(res.data._embedded.artists)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getSuggestionsArtists()
  }, [])

  async function getSuggestionsGenes() {
    const urlString = `https://api.artsy.net/api/genes?size=10
    `
    await getSuggestionsData(urlString)
      .then(res => {
        setSuggestedGenes(res.data._embedded.genes)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getSuggestionsGenes()
  }, [])

  async function getSuggestionsShows() {
    const urlString = `https://api.artsy.net/api/shows?status=current&size=10`
    await getSuggestionsData(urlString)
      .then(res => {
        setSuggestedShows(res.data._embedded.shows)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getSuggestionsShows()
  }, [])

  function SearchContentGenes() {
    if (!searchString) {
      return (
        <React.Fragment>
          <HeadlineContainer>
            <h3>Suggested</h3>
          </HeadlineContainer>
          <ResultContainer>
            {suggestedGenes.map(suggestedGene => (
              <React.Fragment key={suggestedGene.id}>
                {suggestedGene.name}
                <ThumbSearch
                  image={suggestedGene._links.image.href.replace(
                    '{image_version}',
                    'square500'
                  )}
                  key={suggestedGene.id}
                  id={suggestedGene.id}
                />
              </React.Fragment>
            ))}
          </ResultContainer>
        </React.Fragment>
      )
    } else if (dataGenes.length > 0) {
      return (
        <ResultContainer>
          {dataGenes.map(dataGene => (
            <React.Fragment key={dataGene._links.self.href}>
              {dataGene.title}
              <ThumbSearch
                image={
                  dataGene._links.thumbnail.href
                    ? dataGene._links.thumbnail.href
                    : 'https://via.placeholder.com/150'
                }
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
      return <div>No results found</div>
    }
  }
  function SearchContentArtists() {
    if (!searchString) {
      return (
        <React.Fragment>
          <HeadlineContainer>
            <h3>Suggested</h3>
          </HeadlineContainer>
          <ResultContainer>
            {suggestedArtists.map(suggestedArtist => (
              <React.Fragment key={suggestedArtist.id}>
                {suggestedArtist.name}
                <ThumbSearch
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
      )
    } else if (dataArtists.length > 0) {
      return (
        <ResultContainer>
          {dataArtists.map(dataArtist => (
            <React.Fragment key={dataArtist._links.self.href}>
              {dataArtist.title}
              <ThumbSearch
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
      return <div>No results found</div>
    }
  }
  function SearchContentShows() {
    if (!searchString) {
      return (
        <React.Fragment>
          <HeadlineContainer>
            <h3>Suggested</h3>
          </HeadlineContainer>
          <ResultContainer>
            {suggestedShows.map(suggestedShow => (
              <React.Fragment key={suggestedShow.id}>
                {suggestedShow.name}
                <ThumbSearch
                  image={suggestedShow._links.thumbnail.href}
                  key={suggestedShow.id}
                  id={suggestedShow.id}
                />
              </React.Fragment>
            ))}
          </ResultContainer>
        </React.Fragment>
      )
    } else if (dataShows.length > 0) {
      return (
        <ResultContainer>
          {dataShows.map(dataShow => (
            <React.Fragment key={dataShow._links.self.href}>
              {dataShow.title}
              <ThumbSearch
                image={
                  dataShow._links.thumbnail.href
                    ? dataShow._links.thumbnail.href
                    : 'https://via.placeholder.com/150'
                }
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
      return <div>No results found</div>
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
            placeholder="Search"
            type="text"
            onChange={onSearchInputChange}
          />
        </StyledForm>

        <LinkContainer>
          <StyledLink
            // active={searchOption === 'artist' ? 'false' : 'false'}
            onClick={() => onSearchOptionClick('artist')}
            to="/searchTest/artists"
          >
            Artists
          </StyledLink>

          <StyledLink
            // active={searchOption === 'gene' ? 'true' : 'false'}
            to="/searchTest/genre"
          >
            <div onClick={() => onSearchOptionClick('gene')}>Genre</div>
          </StyledLink>

          <StyledLink
            // active={searchOption === 'show' ? 'true' : 'false'}
            onClick={() => onSearchOptionClick('show')}
            to="/searchTest/shows"
          >
            Shows
          </StyledLink>
        </LinkContainer>

        {isLoading ? (
          'LOADING'
        ) : (
          <SwipeableRoutes>
            <Route path="/searchTest/artists" component={ArtistSearch} />
            <Route path="/searchTest/genre" component={GeneSearch} />
            <Route path="/searchTest/shows" component={ShowSearch} />
          </SwipeableRoutes>
        )}
      </PageGrid>
    </Router>
  )
}
