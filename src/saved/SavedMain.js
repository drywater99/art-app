import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import HomeCard from '../common/CardArtwork'
import { getArtworkData } from '../services'

const PageGrid = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  -webkit-overflow-scrolling: touch;
`
const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  font-weight: bold;
  font-size: 25px;
  margin: 15px 24px 0;
  color: #383838;
  overflow: scroll;
`

const CardContainer = styled.section`
  display: grid;
  align-content: flex-start;
  justify-content: center;
  grid-gap: 12px;
  padding: 4px 12px 12px;
`

export default function SavedMain({ onBookmark, bookmarks }) {
  const [pageArtworks, setPageArtworks] = useState([])

  function getSavedArtworks() {
    bookmarks.map(async id => {
      await getArtworkData(id)
        .then(res => {
          setPageArtworks([...pageArtworks, res.data])
        })
        .catch(err => console.log(err))
    })
  }

  useEffect(() => {
    getSavedArtworks()
  }, [])

  return (
    <PageGrid>
      <Title>Saved</Title>
      <CardContainer>
        {pageArtworks ? (
          pageArtworks.map(a => (
            <HomeCard
              date={a.date}
              bookmarked={a.bookmarked}
              collecting_institution={a.collecting_institution}
              author={a.author}
              image={a._links.image.href.replace('{image_version}', 'large')}
              {...a}
              a={a}
              key={a.id}
              onBookmark={onBookmark}
            />
          ))
        ) : (
          <h1>Loading</h1>
        )}
      </CardContainer>
    </PageGrid>
  )
}
