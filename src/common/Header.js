import React, { useState } from 'react'
import Filter from './Filter'
import styled from 'styled-components'

const StyledHeader = styled.header`
  overflow: hidden;
`

export default function Header({ onGeneClick, activeTag, setActiveTag, href }) {
  const [genes] = useState([
    {
      name: 'Trending',
      urlApi: 'https://api.artsy.net/api/artworks?size=20&sort=-trending',
      href:
        'https://d32dm0rphc51dk.cloudfront.net/Tk7srLDTS-0Y60mbN7gWew/big_and_tall.jpg',
    },
    {
      name: '17th Century',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=51b662878b3b81ec27000281',
      href:
        'https://d32dm0rphc51dk.cloudfront.net/JWbwcX077-tmSfaCgsjmeg/big_and_tall.jpg',
    },
    {
      name: 'Figurative Painting',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=4fbabaa5be12d400010007c4',
      href:
        'https://d32dm0rphc51dk.cloudfront.net/EAnTmaoDg3EX-jezJwrtGg/big_and_tall.jpg',
    },
    {
      name: 'Contemporary',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=4d90d18fdcdd5f44a5000025',
      href:
        'https://d32dm0rphc51dk.cloudfront.net/f_WVnADS9HIc5dQ-sIcejA/big_and_tall.jpg',
    },
    {
      name: 'Found Objects',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=4f50f40ad9c50c027b1394b1',
      href:
        'https://d32dm0rphc51dk.cloudfront.net/GgcwiPzDWlZcaH4i4ILPPw/big_and_tall.jpg',
    },
    {
      name: 'Gothic Art',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=4f514737d8f91c000100019b',
      href:
        'https://d32dm0rphc51dk.cloudfront.net/WtY-wgNpdnjBTHxVKttO8A/big_and_tall.jpg',
    },
    {
      name: 'Abstract Art',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=504fb4584ed2d60002000344',
      href:
        'https://d32dm0rphc51dk.cloudfront.net/Tk7srLDTS-0Y60mbN7gWew/big_and_tall.jpg',
    },
    {
      name: 'Street Art',
      urlApi:
        'https://api.artsy.net/api/artworks?gene_id=522e169febad64e88d000001',
      href:
        'https://d32dm0rphc51dk.cloudfront.net/Tk7srLDTS-0Y60mbN7gWew/big_and_tall.jpg',
    },
  ])

  return (
    <StyledHeader>
      {genes.map(gene => (
        <Filter
          genes={genes}
          active={activeTag}
          onGeneClick={onGeneClick}
          image={gene.href}
          name={gene.name}
          key={gene}
        />
      ))}
    </StyledHeader>
  )
}
