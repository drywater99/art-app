import React, { useState } from 'react'
import styled from 'styled-components'

const FilterContainer = styled.header`
  display: grid;
  grid-auto-flow: column;
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  scroll-padding: 0 25px 0 25px;
  padding: 5px 0 0 20px;
`

const FilterButton = styled.div`
  display: flex;
  white-space: nowrap;
  scroll-padding: 20px;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  cursor: default;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  align-items: flex-end;
  justify-content: center;
  margin: 4px;
  width: 102px;
  height: 60px;
  padding: 24px 12px 12px 8px;
  flex: 1 1;
  border-radius: 6px;
`

const ButtonTitle = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #fcfcfc;
  text-decoration: ${p => (p.isActive ? 'underline' : '')};
`

export default function Filter({ onTopicClick }) {
  const [genes] = useState([
    {
      name: 'Old Masters',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=50356574ab74980002000005&size=50',
      href:
        'https://d32dm0rphc51dk.cloudfront.net/o1C6-_FV3rp_ZQPVY-hPtw/big_and_tall.jpg',
    },
    {
      name: 'Random',
      urlApi: 'https://api.artsy.net/api/artworks?size=50',
      href:
        'https://d32dm0rphc51dk.cloudfront.net/NOpIAwQa-3r51Cg9qXKbfA/medium.jpg',
    },
    {
      name: 'Gothic Art',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=4f514737d8f91c000100019b&size=50',
      href:
        'https://d32dm0rphc51dk.cloudfront.net/WtY-wgNpdnjBTHxVKttO8A/big_and_tall.jpg',
    },
    {
      name: 'Baroque',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=4d90d194dcdd5f44a50000ad&size=50',
      href:
        'https://d32dm0rphc51dk.cloudfront.net/4ly-DIuyLoH-JlrLcZjvnw/big_and_tall.jpg',
    },
    {
      name: 'Pop Culture',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=4d9396db17cb13253700048c&size=50',
      href:
        'https://d32dm0rphc51dk.cloudfront.net/zG4wicMdlu7LQFRe2keeIg/big_and_tall.jpg',
    },
  ])
  return (
    <FilterContainer>
      {genes.map(gene => (
        <FilterButton
          style={{ backgroundImage: 'url(' + gene.href + ')' }}
          key={gene.urlApi}
          onClick={() => onTopicClick(gene.urlApi)}
        >
          <ButtonTitle>{gene.name}</ButtonTitle>
        </FilterButton>
      ))}
    </FilterContainer>
  )
}
