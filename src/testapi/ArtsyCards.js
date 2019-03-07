import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
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

const BorderCard = styled.section`
  padding: 10px 0 0;
  filter: drop-shadow(0 10px 10px #cccccc);
`

const ImageCard = styled.div`
  height: 280px;
  width: 325px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 12px 12px 0 0;
  position: relative;
`

const ContentCard = styled.section`
  width: 325px;
  padding: 20px 20px 10px 20px;
  position: relative;
  background: #fafafa;
  border-radius: 0 0 12px 12px;
`

export default class ArtsyCards extends React.Component {
  state = {
    artworks: [],
  }

  componentDidMount() {
    axios
      .get(`https://api.artsy.net/api/artists?size=50&sort=-trending`, {
        headers: {
          'X-Xapp-Token':
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTU1MjQ5NTU2MiwiaWF0IjoxNTUxODkwNzYyLCJhdWQiOiI1YzdmZjk0OTI5MGViYTI4NGZjNzdhNTQiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWM3ZmY5NGEyOTBlYmE0OTE3NWUxZDlhIn0.xuujDMTwmKjPc16Gtjwri4PhdshtAEX5QHg32WtpmoQ',
        },
      })
      .then(res => {
        console.log(res.data._embedded.artists)
        this.setState({
          artworks: [...this.state.artworks, ...res.data._embedded.artists],
        })
      })
  }

  render() {
    return (
      <PageGrid>
        <CardContainer>
          {this.state.artworks.map((artwork, i) => {
            const image = artwork._links.image.href.replace(
              '{image_version}',
              'four_thirds'
            )
            return (
              <Link to={`/artsy/${artwork.id}`}>
                <BorderCard>
                  <ImageCard
                    style={{ backgroundImage: 'url(' + image + ')' }}
                  />
                  <ContentCard>
                    <h3>{artwork.name}</h3>
                    <p>{artwork.birthday}</p>
                  </ContentCard>
                </BorderCard>
              </Link>
            )
          })}
        </CardContainer>
      </PageGrid>
    )
  }
}
