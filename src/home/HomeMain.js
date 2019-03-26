import React, { useState } from 'react'
import styled from 'styled-components'
import CardArtwork from '../common/CardArtwork'
import CardShows from '../common/CardShows'
import HomeAvatar from './HomeAvatar'
import Title from '../common/Title'
import Roller from '../images/Roller.svg'

const PageGrid = styled.div`
  grid-template-rows: auto 1fr;
  overflow: scroll;
`
const CardContainer = styled.section`
  display: grid;
  align-content: flex-start;
  justify-content: center;
  grid-gap: 12px;
  padding: 4px 12px 30px;
  overflow-y: scroll;
`
const AvatarContainer = styled.section`
  display: grid;
  grid-auto-flow: column;
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  scroll-padding: 0 25px 0 25px;
  height: fit-content;
  padding: 25px;
`

const TitleContainer = styled.div`
  margin: 0 25px 0 25px;
  border-top: 1px solid #bababa;
`
const ContentTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  font-weight: bold;
  font-size: 25px;
  margin-top: 25px;
  color: #383838;
  overflow: scroll;
`
const LoadingContainer = styled.section`
  display: flex;
  align-items: center;
  height: 100vh;
  justify-content: center;
`

export default function HomePage({
  onBookmark,
  artworks,
  trendingArtists,
  shows,
  props,
}) {
  const [isLoading, setIsLoading] = useState()

  function RenderArtworks() {
    if (isLoading) {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} width="60px" height="60px" />
        </LoadingContainer>
      )
    } else if (artworks.length > 0) {
      return (
        <React.Fragment>
          <Title data-cy="header-title">Recommended Works</Title>
          <CardContainer>
            {artworks.map(artwork => (
              <CardArtwork
                date={artwork.date}
                collecting_institution={artwork.collecting_institution}
                author={artwork.author}
                image={artwork._links.image.href.replace(
                  '{image_version}',
                  'large'
                )}
                {...artwork}
                key={artwork.id}
                onBookmark={() => onBookmark(artwork)}
              />
            ))}
          </CardContainer>
        </React.Fragment>
      )
    } else {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} width="60px" height="60px" />
        </LoadingContainer>
      )
    }
  }

  function RenderArtists() {
    if (trendingArtists.length > 0) {
      return (
        <React.Fragment>
          <TitleContainer>
            <ContentTitle>Trending Artists</ContentTitle>
          </TitleContainer>
          <AvatarContainer>
            {trendingArtists.map(trendingArtist => (
              <HomeAvatar
                image={trendingArtist._links.image.href.replace(
                  '{image_version}',
                  'square'
                )}
                key={trendingArtist.id}
                id={trendingArtist.id}
                name={trendingArtist.name}
              />
            ))}
          </AvatarContainer>
        </React.Fragment>
      )
    } else {
      return null
    }
  }

  function RenderShows() {
    if (shows.length > 0) {
      return (
        <React.Fragment>
          <TitleContainer>
            <ContentTitle>Shows We Love</ContentTitle>
          </TitleContainer>
          <CardContainer>
            {shows.map(s => (
              <CardShows
                image={s._links.image.href.replace('{image_version}', 'large')}
                key={s.id}
                id={s.id}
                name={s.name}
                onBookmark={s => onBookmark(s)}
              />
            ))}
          </CardContainer>
        </React.Fragment>
      )
    } else {
      return null
    }
  }

  return (
    <PageGrid>
      <RenderArtworks />
      <RenderArtists />
      <RenderShows />
    </PageGrid>
  )
}
