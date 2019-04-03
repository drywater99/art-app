import React, { useState } from 'react'
import styled from 'styled-components'
import ExploreFilter from './ExploreFilter'
import ExploreThumb from './ExploreThumb'
import Roller from '../images/Roller.svg'

const PageGrid = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr;
  overflow: hidden;
`
const LoadingContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
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
const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  font-weight: bold;
  font-size: 25px;
  margin: 15px 24px 0;
  color: #383838;
  overflow: scroll;
`

export default function ExploreMain({ onTopicClick, topics, isLoading }) {
  const [activeTag, setActiveTag] = useState('all')

  function ExploreContent() {
    if (isLoading) {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} width="60px" height="60px" />
        </LoadingContainer>
      )
    } else {
      return (
        <ExploreContainer>
          {topics.map(topic => (
            <ExploreThumb
              image={topic._links.image.href.replace(
                '{image_version}',
                'square'
              )}
              {...topic}
              key={topic.id}
            />
          ))}
        </ExploreContainer>
      )
    }
  }

  return (
    <PageGrid>
      <Title data-cy="header-title">Explore</Title>
      <ExploreFilter
        onTopicClick={onTopicClick}
        activeTag={activeTag}
        setActiveTag={setActiveTag}
      />
      <ExploreContent />
    </PageGrid>
  )
}
