import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Title from '../common/Title'
import { getSearchQueryData, getSuggestionsData } from '../services'
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
  const [suggestions, setSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function getSearchQuery(event) {
    if (event) {
      const urlString = `https://api.artsy.net/api/search?q=${
        event.target.value
      }&offset=0&size=10&type=artist&type=artwork&type=gene`
      setIsLoading(true)
      await getSearchQueryData(urlString)
        .then(res => {
          setData(res.data._embedded.results)
        })
        .catch(err => console.log(err))
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getSearchQuery()
  }, [])

  async function getSuggestions() {
    const urlString = `https://api.artsy.net/api/artists?size=10&sort=-trending`
    await getSuggestionsData(urlString)
      .then(res => {
        setSuggestions(res.data._embedded.artists)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getSuggestions()
  }, [])

  // function ItemRender({ d }) {
  //   console.log(d)
  //   if (d.type === 'artwork') {
  //     return (
  //       <React.Fragment>
  //         {d}
  //         <ExploreThumb image={d._links.thumbnail.href} key={d.title} />
  //       </React.Fragment>
  //     )
  //   } else if (d.type === 'artist') {
  //     return (
  //       <React.Fragment>
  //         {d.title}
  //         <ExploreThumb image={d._links.thumbnail.href} key={d.title} />
  //       </React.Fragment>
  //     )
  //   } else {
  //     return null
  //   }
  // }

  // function SearchContent() {
  //   if (isLoading) {
  //     return <div>Loading...</div>
  //   } else if (data.length > 0) {
  //     console.log(data)
  //     return (
  //       <ExploreContainer>
  //         {data.map(d => (
  //           <ItemRender d={d} key={d.title} />
  //         ))}
  //       </ExploreContainer>
  //     )
  //   } else {
  //     return null
  //   }
  // }
  function SearchContent() {
    if (isLoading) {
      console.log(suggestions)
      return (
        <ExploreContainer>
          {suggestions.map(s => (
            <React.Fragment key={s.id}>
              {s.name}
              <ExploreThumb
                image={s._links.image.href.replace('{image_version}', 'large')}
                key={s.id}
              />
            </React.Fragment>
          ))}
        </ExploreContainer>
      )
    } else if (data.length > 0) {
      console.log(data)
      return (
        <ExploreContainer>
          {data.map(d => (
            <React.Fragment key={d._links.self.href}>
              {d.title}
              <ExploreThumb
                image={
                  d._links.thumbnail.href
                    ? d._links.thumbnail.href
                    : 'https://via.placeholder.com/150'
                }
                key={d._links.self.href}
              />
            </React.Fragment>
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
