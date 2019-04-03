import React from 'react'
import styled from 'styled-components'
import GeneThumbnails from './GeneThumb'

const PageGrid = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr;
  overflow: hidden;
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

const ExploreContainer = styled.section`
  display: grid;
  grid-template-columns: 150px 150px;
  grid-template-rows: auto;
  grid-column-gap: 21px;
  grid-row-gap: 18px;
  padding: 25px;
  overflow-y: scroll;
`

export default function GeneMain({ genes, isLoading }) {
  let exploreContent
  if (isLoading) {
    exploreContent = 'Loading'
  } else {
    exploreContent = (
      <ExploreContainer>
        {genes.map(gene => (
          <GeneThumbnails
            image={gene._links.image.href.replace(
              '{image_version}',
              'square500'
            )}
            name={gene.name}
            {...gene}
            key={gene.id}
          />
        ))}
      </ExploreContainer>
    )
  }

  return (
    <PageGrid>
      <Title data-cy="header-title">Categories</Title>
      {exploreContent}
    </PageGrid>
  )
}
