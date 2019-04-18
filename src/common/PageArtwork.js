import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ThumbSimGene from './ThumbSimGene'
import ThumbSimArtwork from './ThumbSimArtwork'
import Roller from '../images/Roller.svg'
import Icon from '../app/Icon'
import {
  getArtworkData,
  getArtistByArtworkData,
  getSimilarArtworksToArtworkData,
  getArtworkGenesData,
} from '../services'
import {
  PageGrid,
  ContentContainer,
  ImageCard,
  CancelButtonContainer,
  BookmarkContainer,
  FullImage,
  ExploreContainer,
  ContentTitle,
  SectionTitle,
  StyledLink,
  ExploreContainerX,
  LoadingContainer,
} from './PageArtworkStyles'

PageArtwork.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  bookmarked: PropTypes.bool,
  onBookmark: PropTypes.func,
}

PageArtwork.defaultProps = {
  title: 'No title defined',
  content: 'No content defined',
  bookmarked: false,
}

export default function PageArtwork({ onBookmark, bookmarked, id, history }) {
  const [pageArtwork, setPageArtwork] = useState([])
  const [artworkArtist, setArtworkArtist] = useState([])
  const [artworkGenes, setArtworkGenes] = useState([])
  const [simArtworks, setSimArtworks] = useState([])
  const [isLoading, setIsLoading] = useState()

  async function getArtwork() {
    setIsLoading(true)
    try {
      const res = await getArtworkData(id)
      setPageArtwork([res.data])
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  async function getData(getter, setter, name) {
    setIsLoading(true)
    try {
      const res = await getter(id)
      setter(res.data._embedded[name])
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  function getArtistByArtwork() {
    getData(getArtistByArtworkData, setArtworkArtist, 'artists')
  }

  function getSimilarArtworksToArtwork() {
    getData(getSimilarArtworksToArtworkData, setSimArtworks, 'artworks')
  }

  async function getArtworkGenes() {
    getData(getArtworkGenesData, setArtworkGenes, 'genes')
  }

  useEffect(() => {
    getArtwork()
    getArtistByArtwork()
    getSimilarArtworksToArtwork()
    getArtworkGenes()
  }, [id])

  function goBack() {
    history.goBack()
  }

  function renderBookmark(condition) {
    return (
      <Icon
        fill={condition ? '#b8847d' : '#949494'}
        name={`heart${condition ? '_active' : ''}`}
      />
    )
  }

  function PageGeneContent() {
    if (isLoading) {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} />
        </LoadingContainer>
      )
    } else if (pageArtwork.length) {
      return (
        <React.Fragment>
          {pageArtwork.map(a => {
            const image = a._links.image.href.replace(
              '{image_version}',
              'large'
            )
            return (
              <PageGrid key={a.id}>
                <CancelButtonContainer onClick={goBack}>
                  <Icon name="cancel" />
                </CancelButtonContainer>
                <ImageCard style={{ backgroundImage: 'url(' + image + ')' }} />
                <BookmarkContainer onClick={() => onBookmark(id)}>
                  {renderBookmark(bookmarked)}
                </BookmarkContainer>
                <ContentTitle>
                  {artworkArtist.map(homeArtist => (
                    <StyledLink
                      to={`/artist/${homeArtist.id}`}
                      key={homeArtist.id}
                    >
                      <h3>{homeArtist.name} ❯</h3>
                    </StyledLink>
                  ))}
                  <p>{a.title}</p>
                  <h3>{a.date}</h3>
                </ContentTitle>
                <ContentContainer>
                  <small>{a.category}</small>
                  <small>{a.medium}</small>
                  <small>{a.dimensions.cm.text}</small>
                  <small>{a.dimensions.in.text}</small>
                </ContentContainer>
                <ContentContainer>
                  <h3>Location</h3>
                  <br />
                  <small>{a.collecting_institution}</small>
                </ContentContainer>
                {artworkGenes ? (
                  <ContentContainer>
                    <h3>Categories</h3> <br />
                    {artworkGenes.map(artworkGene => (
                      <small key={artworkGene.id}>
                        {artworkGene.display_name || artworkGene.name}
                      </small>
                    ))}
                  </ContentContainer>
                ) : null}
                <FullImage
                  src={a._links.image.href.replace('{image_version}', 'larger')}
                />
                <SearchContentSimArtworks />
                <SearchContentSimCategories />
              </PageGrid>
            )
          })}
        </React.Fragment>
      )
    } else {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} />
        </LoadingContainer>
      )
    }
  }

  function SearchContentSimArtworks() {
    if (isLoading) {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} />
        </LoadingContainer>
      )
    } else if (simArtworks.length) {
      return (
        <React.Fragment>
          <SectionTitle>
            <h2>Similar Artworks</h2>
          </SectionTitle>
          <ExploreContainerX>
            {simArtworks.map(simArtwork => (
              <ThumbSimArtwork
                image={simArtwork._links.image.href.replace(
                  '{image_version}',
                  'large'
                )}
                id={simArtwork.id}
                key={simArtwork.id}
              />
            ))}
          </ExploreContainerX>
        </React.Fragment>
      )
    } else {
      return null
    }
  }

  function SearchContentSimCategories() {
    if (isLoading) {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} />
        </LoadingContainer>
      )
    } else if (artworkGenes.length) {
      return (
        <React.Fragment>
          <SectionTitle>
            <h2>Related Categories</h2>
          </SectionTitle>
          <ExploreContainer>
            {artworkGenes.map(artistGene => (
              <ThumbSimGene
                image={artistGene._links.image.href.replace(
                  '{image_version}',
                  'square500'
                )}
                id={artistGene.id}
                name={artistGene.name}
                display_name={artistGene.display_name}
                key={artistGene.id}
              />
            ))}
          </ExploreContainer>
        </React.Fragment>
      )
    } else {
      return null
    }
  }

  return (
    <React.Fragment>
      <PageGeneContent />
    </React.Fragment>
  )
}
