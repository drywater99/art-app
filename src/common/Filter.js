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
  background-blend-mode: darken;
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

export default function Filter({ onTopicClick, active }) {
  const [topicApis] = useState([
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
      name: 'Pop Art',
      urlApi:
        'https://api.artsy.net/api/artists?gene_id=4e5e41670d2c670001030350&size=50',
      href:
        'https://d32dm0rphc51dk.cloudfront.net/46PghnvIBjrN25-_kPPwQA/big_and_tall.jpg',
    },
    {
      name: 'Photography',
      urlApi:
        'https://api.artsy.net/api/artists?gene_id=50356575ab7498000200000f&size=50',
      href:
        'https://d32dm0rphc51dk.cloudfront.net/60jOLdlmGHMs5cF-4bM2_w/big_and_tall.jpg',
    },
    {
      name: 'Baroque',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=4d90d194dcdd5f44a50000ad&size=50',
      href:
        'https://d32dm0rphc51dk.cloudfront.net/4ly-DIuyLoH-JlrLcZjvnw/big_and_tall.jpg',
    },
    {
      name: 'Contemporay',
      urlApi:
        'https://api.artsy.net/api/artists?gene_id=504f7335de9164000200041a&size=50',
      href:
        'https://d32dm0rphc51dk.cloudfront.net/DsYeaxMGPVgQEC09yVj0KQ/big_and_tall.jpg',
    },
    {
      name: 'New Topographics',
      urlApi:
        'https://api.artsy.net/api/artists?gene_id=4e8f6e5120df9500010059ba&size=50',
      href:
        'https://d32dm0rphc51dk.cloudfront.net/YIMb7ZdxIjLRQ8JgzD8ycg/big_and_tall.jpg',
    },
    {
      name: 'Modernism',
      urlApi:
        'https://api.artsy.net/api/artists?gene_id=50356574ab74980002000006&size=50',
      href:
        'https://d32dm0rphc51dk.cloudfront.net/Y2fVKtk64zRDfoGWgYSkJA/big_and_tall.jpg',
    },
  ])
  return (
    <FilterContainer>
      {topicApis.map(topicApi => (
        <FilterButton
          style={{
            backgroundImage:
              'url(' +
              topicApi.href +
              '), linear-gradient(transparent, #525252)',
          }}
          key={topicApi.urlApi}
          onClick={() => onTopicClick(topicApi.urlApi)}
        >
          <ButtonTitle
            key={topicApi.urlApi}
            isActive={topicApi.urlApi === active}
          >
            {topicApi.name}
          </ButtonTitle>
        </FilterButton>
      ))}
    </FilterContainer>
  )
}
