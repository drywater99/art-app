import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ThumbSimGene from './ThumbSimGene'
import ThumbSimArtwork from './ThumbSimArtwork'
import Roller from '../images/Roller.svg'
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
  CloseLink,
  BookmarkContainer,
  Bookmark,
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

  async function getArtistByArtwork() {
    setIsLoading(true)
    try {
      const res = await getArtistByArtworkData(id)
      setArtworkArtist(res.data._embedded.artists)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  async function getSimilarArtworksToArtwork() {
    setIsLoading(true)
    try {
      const res = await getSimilarArtworksToArtworkData(id)
      setSimArtworks(res.data._embedded.artworks)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  async function getArtworkGenes() {
    setIsLoading(true)
    try {
      const res = await getArtworkGenesData(id)
      setArtworkGenes(res.data._embedded.genes)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
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

  function PageGeneContent() {
    if (isLoading) {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} width="60px" height="60px" />
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
                <CloseLink onClick={goBack}>x</CloseLink>
                <ImageCard style={{ backgroundImage: 'url(' + image + ')' }} />
                <BookmarkContainer>
                  {onBookmark && (
                    <Bookmark
                      active={bookmarked === true}
                      onClick={() => onBookmark(id)}
                    />
                  )}
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
          <img alt="Roller" src={Roller} width="60px" height="60px" />
        </LoadingContainer>
      )
    }
  }

  function SearchContentSimArtworks() {
    if (isLoading) {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} width="60px" height="60px" />
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
          <img alt="Roller" src={Roller} width="60px" height="60px" />
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
