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
      image:
        'https://d32dm0rphc51dk.cloudfront.net/o1C6-_FV3rp_ZQPVY-hPtw/big_and_tall.jpg',
    },
    {
      name: 'Random',
      urlApi: 'https://api.artsy.net/api/artworks?size=50',
      image:
        'https://d32dm0rphc51dk.cloudfront.net/NOpIAwQa-3r51Cg9qXKbfA/medium.jpg',
    },
    {
      name: 'Design',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=5845d1449c18db7330001c5d',
      image:
        'https://d32dm0rphc51dk.cloudfront.net/D9BR53JPC0tory7evDbv-Q/thumb.jpg',
    },
    {
      name: 'Renaissance',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=4f26f2e004ea5c0001000167&size=50',
      image:
        'https://d32dm0rphc51dk.cloudfront.net/XxR4YrbxOIUSZgFvte_K1A/big_and_tall.jpg',
    },
    {
      name: 'Baroque',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=4d90d194dcdd5f44a50000ad&size=50',
      image:
        'https://d32dm0rphc51dk.cloudfront.net/4ly-DIuyLoH-JlrLcZjvnw/big_and_tall.jpg',
    },
    {
      name: 'Contemporay',
      urlApi:
        'https://api.artsy.net/api/artists?gene_id=504f7335de9164000200041a&size=50',
      image:
        'https://d32dm0rphc51dk.cloudfront.net/DsYeaxMGPVgQEC09yVj0KQ/big_and_tall.jpg',
    },
    {
      name: 'Drawing',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=4f3edd319c211a00010000d6&size=50',
      image:
        'https://d32dm0rphc51dk.cloudfront.net/bzKTw_jn7zxAmvAiP1uIxw/big_and_tall.jpg',
    },
    {
      name: 'Medieval',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=4f3ab350acbecf0001000638&size=50',
      image:
        'https://d32dm0rphc51dk.cloudfront.net/yk3N6KnZ4FCberc2g2qDDg/big_and_tall.jpg',
    },
    {
      name: 'Eye Contact',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=51efe2708b3b8196fc000462&size=50',
      image:
        'https://d32dm0rphc51dk.cloudfront.net/TaRTIdn2xHnFkernyk1BNg/big_and_tall.jpg',
    },
    {
      name: 'Face',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=50b98fe08c65b4a57600012c&size=50',
      image:
        'https://d32dm0rphc51dk.cloudfront.net/ezhTpE7U-QT6oJtElY4clw/big_and_tall.jpg',
    },
    {
      name: 'Figuration',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=520baa99a09a678af00000cc&size=50',
      image:
        'https://d32dm0rphc51dk.cloudfront.net/ezhTpE7U-QT6oJtElY4clw/big_and_tall.jpg',
    },
  ])
  return (
    <FilterContainer>
      {topicApis.map(topicApi => (
        <FilterButton
          style={{
            backgroundImage:
              'url(' +
              topicApi.image +
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
