import React, { useState } from 'react'
import styled from 'styled-components'
import Filter from '../common/Filter'
import ExploreThumb from './ExploreThumb'
import Title from '../common/Title'

const PageGrid = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr;
  overflow: hidden;
`

const ExploreContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  padding: 15px 5px 5px 5px;
  overflow-y: scroll;
  border-top: 1px solid #d0d0d0;
`

export default function ExploreMain({ onTopicClick, topics, isLoading }) {
  const [activeTag, setActiveTag] = useState('all')
  let exploreContent
  if (isLoading) {
    exploreContent = 'Loading'
  } else {
    exploreContent = (
      <ExploreContainer>
        {topics.map(topic => (
          <ExploreThumb
            image={topic._links.image.href.replace('{image_version}', 'small')}
            {...topic}
            key={topic.id}
          />
        ))}
      </ExploreContainer>
    )
  }

  return (
    <PageGrid>
      <Title data-cy="header-title">Explore</Title>
      <Filter
        onTopicClick={onTopicClick}
        activeTag={activeTag}
        setActiveTag={setActiveTag}
      />
      {exploreContent}
    </PageGrid>
  )
}
