import React from 'react'
import CardArtwork from '../common/CardArtwork'
import CardShows from '../common/CardShows'
import HomeAvatar from './HomeAvatar'
import Roller from '../images/Roller.svg'
import {
  PageGrid,
  Title,
  StartLogo,
  CardContainer,
  AvatarContainer,
  TitleContainer,
  ContentTitle,
  LoadingContainer,
} from './HomeMainStyles'

export default function HomePage({
  onBookmark,
  artworks,
  trendingArtists,
  shows,
  isLoading,
  setShowLogo,
  showLogo,
}) {
  setTimeout(() => {
    setShowLogo(false)
  }, 3500)

  function ShowLogo() {
    if (showLogo === true) {
      return (
        <StartLogo>
          Art <br />
          Collector
          <br />
          <br />
          <br />
        </StartLogo>
      )
    } else {
      return null
    }
  }

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
                bookmarked={artwork.bookmarked}
                date={artwork.date}
                collecting_institution={artwork.collecting_institution}
                author={artwork.author}
                image={artwork._links.image.href.replace(
                  '{image_version}',
                  'large'
                )}
                key={artwork.id}
                onBookmark={onBookmark}
                artwork={artwork}
                {...artwork}
                id={artwork.id}
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
      <ShowLogo />
      <RenderArtworks />
      <RenderArtists />
      <RenderShows />
    </PageGrid>
  )
}
