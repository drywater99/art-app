import React from 'react'
import styled from 'styled-components'
import GeneThumbnails from './GeneThumb'
import Title from '../common/Title'

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

export default function GenePage({ genes, isLoading }) {
  let exploreContent
  if (isLoading) {
    exploreContent = 'Loading'
  } else {
    console.log(genes)
    exploreContent = (
      <ExploreContainer>
        {genes.map(gene => (
          <GeneThumbnails
            image={gene._links.image.href.replace(
              '{image_version}',
              'square500'
            )}
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
