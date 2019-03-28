import React, { useState } from 'react'
import styled from 'styled-components'

const FilterContainer = styled.header`
  display: grid;
  grid-auto-flow: column;
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  scroll-padding: 0 5px 0 5px;
  padding: 5px 0 12px 2px;
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
        'https://api.artsy.net/api/artworks?gene_id=50356574ab74980002000005&size=20',
      image:
        'https://d32dm0rphc51dk.cloudfront.net/o1C6-_FV3rp_ZQPVY-hPtw/big_and_tall.jpg',
    },
    {
      name: 'Random',
      urlApi: 'https://api.artsy.net/api/artworks?size=20',
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
        'https://api.artsy.net/api/artists?gene_id=504f7335de9164000200041a&size=40',
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
    {
      name: 'Hyper Realism',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=4ef3aaa334c5a8000100186e&size=50',
      image:
        'https://d32dm0rphc51dk.cloudfront.net/i7VY2-31Qw75MDgCw-V-9Q/big_and_tall.jpg',
    },
    {
      name: 'Photo Realism',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=56aa638ecb4c2766730000f8&size=50',
      image:
        'https://d32dm0rphc51dk.cloudfront.net/6AiaLPs6Dfez63XXsruEqQ/tall.jpg',
    },
    {
      name: 'Art History',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=51f18d0e275b24a84d00063a&size=50',
      image:
        'https://d32dm0rphc51dk.cloudfront.net/5RdCe-frpsgSKZU4gImgTA/big_and_tall.jpg',
    },
    {
      name: 'Illustration',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=4dd6e2ae3ccb2f00010056a9&size=50',
      image:
        'https://d32dm0rphc51dk.cloudfront.net/VfAViYUAM--cmdQDlqlMWA/big_and_tall.jpg',
    },
    {
      name: 'Impressionism',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=4d90d191dcdd5f44a500004e&size=50',
      image:
        'https://d32dm0rphc51dk.cloudfront.net/3u73ZU6Q_zbZFqI1dPlt-A/big_and_tall.jpg',
    },
    {
      name: 'Physics',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=53763281cd530e163300008f&size=50',
      image:
        'https://d32dm0rphc51dk.cloudfront.net/wKv9nQhtlRdlKFElz-uhhQ/big_and_tall.jpg',
    },
    {
      name: 'Produkt Design',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=54c7cfaa7261692b6e200600',
      image:
        'https://d32dm0rphc51dk.cloudfront.net/TYDaZWQUgXVki9t3_L6ycg/big_and_tall.jpg',
    },
    {
      name: 'Interiors',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=4d90d195dcdd5f44a50000b6&size=50',
      image:
        'https://d32dm0rphc51dk.cloudfront.net/VXOUZ3us4MSh-2ty2_I0KQ/big_and_tall.jpg',
    },
    {
      name: 'Interlaced Bodies',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=50b990c41e2b6f811700015b&size=50',
      image:
        'https://d32dm0rphc51dk.cloudfront.net/Mp94xq5tWGhBEsdhQYcVxg/big_and_tall.jpg',
    },
    {
      name: '19th Century',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=51b662538b3b8190570001e2&size=50',
      image:
        'https://d32dm0rphc51dk.cloudfront.net/OKL_2L_oP18fcCd3cyEcBQ/big_and_tall.jpg',
    },
    {
      name: 'Leisure',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=4fec76fd81f8f10001002004&size=50',
      image:
        'https://d32dm0rphc51dk.cloudfront.net/r4cPKUaHuSceIJ0DuvYpag/big_and_tall.jpg',
    },
    {
      name: 'Love',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=4de292fcef72520001005fe5&size=50',
      image:
        'https://d32dm0rphc51dk.cloudfront.net/179nvkRxrzTauvGkuRK_mQ/big_and_tall.jpg',
    },
    {
      name: 'Mannerism',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=4d90d194dcdd5f44a50000ae&size=50',
      image:
        'https://d32dm0rphc51dk.cloudfront.net/BXnI7hfWOkQqyP777vppWw/big_and_tall.jpg',
    },
    {
      name: 'Mixed Media',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=4d90d18edcdd5f44a500000f&size=200',
      image:
        'https://d32dm0rphc51dk.cloudfront.net/mV84Hu6EIOvASdZ5gOGMag/big_and_tall.jpg',
    },
    {
      name: 'Modernism & Impressionism',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=50356574ab74980002000006&size=50',
      image:
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
