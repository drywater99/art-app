import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Title from '../common/Title'
import { getSearchQueryData } from '../services'
import ExploreThumb from './ExploreThumb'

const PageGrid = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr;
  overflow: hidden;
`

const ExploreContainer = styled.section`
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

export default function Search() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function getSearchQuery(event) {
    if (event) {
      const urlString = `https://api.artsy.net/api/search?q=${
        event.target.value
      }&offset=0&size=10`
      setIsLoading(true)
      await getSearchQueryData(urlString)
        .then(res => {
          console.log(data)

          setData(res.data._embedded.results)
        })
        .catch(err => console.log(err))
      setIsLoading(false)
    }
  }

  //   if (event.target.value === '') {
  //     getTrendingMovies()
  //   } else {
  //     Axios.get(searchString).then(res => {
  //       const { results } = res.data
  //       setMovies(results)
  //     })
  //   }

  useEffect(() => {
    getSearchQuery()
  }, [])

  function ItemRender({ d }) {
    console.log(d)
    if (d.type === 'artwork') {
      return (
        <React.Fragment>
          {d}
          <ExploreThumb image={d._links.thumbnail.href} key={d.title} />
        </React.Fragment>
      )
    } else if (d.type === 'artist') {
      return (
        <React.Fragment>
          {d.title ? d.title : null}
          <ExploreThumb
            image={d._links.thumbnail.href ? d._links.thumbnail.href : null}
            key={d.title ? d.title : null}
          />
        </React.Fragment>
      )
    } else {
      return null
    }
  }

  function SearchContent() {
    if (isLoading) {
      return <div>Loading...</div>
    } else if (data.length > 0) {
      console.log(data)
      return (
        <ExploreContainer>
          {data.map(d => (
            <ItemRender d={d} />
          ))}
        </ExploreContainer>
      )
    } else {
      return null
    }
  }

  return (
    <PageGrid>
      <Title data-cy="header-title">Search</Title>
      <StyledForm>
        <StyledInput
          placeholder="Search"
          type="text"
          onChange={e => getSearchQuery(e)}
        />
      </StyledForm>
      <SearchContent />
    </PageGrid>
  )
}
