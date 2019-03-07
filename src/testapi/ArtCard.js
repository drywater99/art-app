import React from 'react'
import axios from 'axios'
import Card from '../cards/Card'
import styled from 'styled-components'

const PageGrid = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  overflow: hidden;
`

const CardContainer = styled.section`
  display: grid;
  align-content: flex-start;
  justify-content: center;
  grid-gap: 12px;
  padding: 4px 12px 12px;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  -webkit-overflow-scrolling: touch;
`

export default class ArtCard extends React.Component {
  state = {
    artworks: [],
  }

  componentDidMount() {
    axios
      .get(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflowers
        `
      )
      .then(res => {
        res.data.objectIDs.map(id =>
          axios
            .get(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
            )
            .then(res =>
              this.setState({ artworks: [...this.state.artworks, res.data] })
            )
        )
      })
  }

  render() {
    return (
      <PageGrid>
        <CardContainer>
          {this.state.artworks.map((artwork, i) => (
            <Card
              key={i}
              title={artwork.title}
              author={artwork.artistDisplayName}
              image={artwork.primaryImageSmall}
              {...artwork}
            />
          ))}
        </CardContainer>
      </PageGrid>
    )
  }
}
