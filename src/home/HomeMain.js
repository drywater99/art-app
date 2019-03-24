import React from 'react'
import styled from 'styled-components'
import CardArtwork from '../common/CardArtwork'
import CardShows from '../common/CardShows'
import HomeAvatar from './HomeAvatar'
import Title from '../common/Title'

const PageGrid = styled.div`
  grid-template-rows: auto auto 1fr;
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

export default function HomePage({
  onBookmark,
  artworks,
  trendingArtists,
  shows,
}) {
  function RenderArtworks() {
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
  }

  function RenderArtists() {
    return (
      <React.Fragment>
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
  }

  function RenderShows() {
    return (
      <React.Fragment>
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
  }

  return (
    <PageGrid>
      <RenderArtworks />
      <TitleContainer>
        <ContentTitle>Trending Artists</ContentTitle>
      </TitleContainer>
      <RenderArtists />
      <TitleContainer>
        <ContentTitle>Shows We Love</ContentTitle>
      </TitleContainer>
      <RenderShows />
    </PageGrid>
  )
}
