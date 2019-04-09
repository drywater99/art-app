import React, { useState, useEffect } from 'react'
import { BrowserRouter as Route } from 'react-router-dom'
import SwipeableRoutes from 'react-swipeable-routes'
import { debounce } from 'debounce'
import SearchThumbArtist from './SearchThumbArtist'
import SearchThumb from './SearchThumb'
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
  HeadlineContainer,
  ResultContainer,
  LoadingContainer,
  StyledForm,
  StyledInput,
  IconContainer,
  LinkContainer,
  StyledLink,
  Hr,
} from './SearchMainStyles'

export default function SearchMain(props) {
  const [dataArtists, setDataArtists] = useState([])
  const [dataGenes, setDataGenes] = useState([])
  const [dataShows, setDataShows] = useState([])
  const [suggestedArtists, setsuggestedArtists] = useState([])
  const [suggestedGenes, setSuggestedGenes] = useState([])
  const [suggestedShows, setSuggestedShows] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchString, setSearchString] = useState('')
  const [locationState, setLocationState] = useState(props.location)
  const [isActive, setIsActive] = useState(1)

  const onSearchInputChange = debounce(text => {
    setSearchString(text)
    getSearchQuery()
  }, 300)

  function clearInput(e) {
    e.preventDefault()
    setSearchString('')
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
      return isLoading ? (
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
              <SearchThumbArtist
                key={suggestedArtist.id}
                image={suggestedArtist._links.image.href.replace(
                  '{image_version}',
                  'large'
                )}
                name={suggestedArtist.name}
                id={suggestedArtist.id}
                location={props.location}
                urlCategory="artist"
              />
            ))}
          </ResultContainer>
        </React.Fragment>
      )
    } else if (dataArtists.length) {
      return (
        <ResultContainer>
          {dataArtists.map(dataArtist => (
            <SearchThumbArtist
              key={dataArtist._links.self.href}
              image={
                dataArtist._links.thumbnail.href.includes(
                  '/assets/shared/missing_image.png'
                )
                  ? 'https://via.placeholder.com/150'
                  : dataArtist._links.thumbnail.href
              }
              title={dataArtist.title}
              id={dataArtist._links.self.href.replace(
                'https://api.artsy.net/api/artists/',
                ''
              )}
              urlCategory="artist"
            />
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
                  <SearchThumb
                    key={suggestedGene.id}
                    image={suggestedGene._links.image.href.replace(
                      '{image_version}',
                      'square500'
                    )}
                    name={suggestedGene.name}
                    id={suggestedGene.id}
                    urlCategory="gene"
                  />
                ))}
              </ResultContainer>
            </React.Fragment>
          )}
        </React.Fragment>
      )
    } else if (dataGenes.length) {
      return (
        <ResultContainer>
          {dataGenes.map(dataGene => (
            <SearchThumb
              key={dataGene._links.self.href}
              image={
                dataGene._links.thumbnail.href.includes(
                  '/assets/shared/missing_image.png'
                )
                  ? 'https://via.placeholder.com/150'
                  : dataGene._links.thumbnail.href
              }
              title={dataGene.title}
              id={dataGene._links.self.href.replace(
                'https://api.artsy.net/api/genes/',
                ''
              )}
              urlCategory="gene"
            />
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
      return isLoading ? (
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
                  image={
                    suggestedShow._links.thumbnail.href.includes(
                      '/assets/shared/missing_image.png'
                    )
                      ? 'https://via.placeholder.com/150'
                      : suggestedShow._links.thumbnail.href
                  }
                  key={suggestedShow.id}
                  id={suggestedShow.id}
                  urlCategory="show"
                />
              </React.Fragment>
            ))}
          </ResultContainer>
        </React.Fragment>
      )
    } else if (dataShows.length) {
      return (
        <ResultContainer>
          {dataShows.map(dataShow => (
            <SearchThumb
              image={
                dataShow._links.thumbnail.href.includes(
                  '/assets/shared/missing_image.png'
                )
                  ? 'https://via.placeholder.com/150'
                  : dataShow._links.thumbnail.href
              }
              title={dataShow.title}
              key={dataShow._links.self.href}
              id={dataShow._links.self.href.replace(
                'https://api.artsy.net/api/shows/',
                ''
              )}
              urlCategory="show"
            />
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
  )
}
