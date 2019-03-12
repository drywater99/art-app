import React, { useState } from 'react'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
import styled from 'styled-components'
import HomePage from '../cards/HomePage'
import ExplorePage from '../cards/ExplorePage'
import SavedPage from '../cards/SavedPage'
import SingleCardPage from '../cards/SingleCardPage'

//import { Helmet } from 'react-helmet'

import { getGeneData } from '../services'
import GlobalStyle from './GlobalStyle'
import ArtsyCards from '../testapi/ArtsyCards'

const Grid = styled.div`
  display: grid;
  grid-template-rows: auto 48px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const Nav = styled.nav`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 2px;
`

const StyledLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  margin: 15px 24px;
  color: #383838;
  text-decoration: none;
  &.active {
    text-decoration: underline;
  }
`

function App(PageGrid, CardBox) {
  const [cards, setCards] = useState([
    {
      id: '50749e8957362b0002001c65',
      slug: 'filippino-lippi',
      created_at: '2012-10-09T22:00:42+00:00',
      updated_at: '2019-03-11T07:13:07+00:00',
      name: 'Filippino Lippi',
      sortable_name: 'Lippi Filippino',
      gender: 'male',
      biography: '',
      birthday: '1457',
      deathday: '1504',
      hometown: 'Prato, Italy',
      location: 'Florence, Italy',
      nationality: 'Italian',
      image_versions: ['four_thirds', 'large', 'square', 'tall'],
      _links: {
        thumbnail: {
          href:
            'https://d32dm0rphc51dk.cloudfront.net/BJIGOQfdIgQL8ffuMza8Nw/four_thirds.jpg',
        },
        image: {
          href:
            'https://d32dm0rphc51dk.cloudfront.net/BJIGOQfdIgQL8ffuMza8Nw/{image_version}.jpg',
          templated: true,
        },
        self: {
          href: 'https://api.artsy.net/api/artists/50749e8957362b0002001c65',
        },
        permalink: {
          href: 'http://www.artsy.net/artist/filippino-lippi',
        },
        artworks: {
          href:
            'https://api.artsy.net/api/artworks?artist_id=50749e8957362b0002001c65',
        },
        published_artworks: {
          href:
            'https://api.artsy.net/api/artworks?artist_id=50749e8957362b0002001c65&published=true',
        },
        similar_artists: {
          href:
            'https://api.artsy.net/api/artists?similar_to_artist_id=50749e8957362b0002001c65',
        },
        similar_contemporary_artists: {
          href:
            'https://api.artsy.net/api/artists?similar_to_artist_id=50749e8957362b0002001c65&similarity_type=contemporary',
        },
        genes: {
          href:
            'https://api.artsy.net/api/genes?artist_id=50749e8957362b0002001c65',
        },
      },
    },
    {
      id: '542c6c737261692d34920400',
      slug: 'joan-reixach',
      created_at: '2014-10-01T21:04:51+00:00',
      updated_at: '2018-03-23T18:42:24+00:00',
      name: 'Joan Reixach',
      sortable_name: 'Reixach Joan',
      gender: null,
      biography: '',
      birthday: '',
      deathday: '',
      hometown: '',
      location: '',
      nationality: '',
      image_versions: ['four_thirds', 'large', 'square', 'tall'],
      _links: {
        thumbnail: {
          href:
            'https://d32dm0rphc51dk.cloudfront.net/k3aU8Fj1vM2hsmBKopJrew/four_thirds.jpg',
        },
        image: {
          href:
            'https://d32dm0rphc51dk.cloudfront.net/k3aU8Fj1vM2hsmBKopJrew/{image_version}.jpg',
          templated: true,
        },
        self: {
          href: 'https://api.artsy.net/api/artists/542c6c737261692d34920400',
        },
        permalink: {
          href: 'http://www.artsy.net/artist/joan-reixach',
        },
        artworks: {
          href:
            'https://api.artsy.net/api/artworks?artist_id=542c6c737261692d34920400',
        },
        published_artworks: {
          href:
            'https://api.artsy.net/api/artworks?artist_id=542c6c737261692d34920400&published=true',
        },
        similar_artists: {
          href:
            'https://api.artsy.net/api/artists?similar_to_artist_id=542c6c737261692d34920400',
        },
        similar_contemporary_artists: {
          href:
            'https://api.artsy.net/api/artists?similar_to_artist_id=542c6c737261692d34920400&similarity_type=contemporary',
        },
        genes: {
          href:
            'https://api.artsy.net/api/genes?artist_id=542c6c737261692d34920400',
        },
      },
    },
    {
      id: '53ed2f137261695c2efe0600',
      slug: 'gherardo-di-jacopo-starnina-master-of-the-bambino-vispo',
      created_at: '2014-08-14T21:50:11+00:00',
      updated_at: '2019-02-27T11:01:44+00:00',
      name: 'Gherardo di Jacopo Starnina (Master of the Bambino Vispo)',
      sortable_name:
        'Gherardo di Jacopo Starnina (Master of the Bambino Vispo)',
      gender: 'male',
      biography: '',
      birthday: 'about 1364',
      deathday: '1413',
      hometown: '',
      location: '',
      nationality: '',
      image_versions: ['four_thirds', 'large', 'square', 'tall'],
      _links: {
        thumbnail: {
          href:
            'https://d32dm0rphc51dk.cloudfront.net/usgJL1it2oJOKFwXI06qLQ/four_thirds.jpg',
        },
        image: {
          href:
            'https://d32dm0rphc51dk.cloudfront.net/usgJL1it2oJOKFwXI06qLQ/{image_version}.jpg',
          templated: true,
        },
        self: {
          href: 'https://api.artsy.net/api/artists/53ed2f137261695c2efe0600',
        },
        permalink: {
          href:
            'http://www.artsy.net/artist/gherardo-di-jacopo-starnina-master-of-the-bambino-vispo',
        },
        artworks: {
          href:
            'https://api.artsy.net/api/artworks?artist_id=53ed2f137261695c2efe0600',
        },
        published_artworks: {
          href:
            'https://api.artsy.net/api/artworks?artist_id=53ed2f137261695c2efe0600&published=true',
        },
        similar_artists: {
          href:
            'https://api.artsy.net/api/artists?similar_to_artist_id=53ed2f137261695c2efe0600',
        },
        similar_contemporary_artists: {
          href:
            'https://api.artsy.net/api/artists?similar_to_artist_id=53ed2f137261695c2efe0600&similarity_type=contemporary',
        },
        genes: {
          href:
            'https://api.artsy.net/api/genes?artist_id=53ed2f137261695c2efe0600',
        },
      },
    },
  ])

  function filterByGene(url) {
    getGeneData(url).then(res => {
      const results = res.data._embedded.artists
      setCards(results)
    })
  }

  function toggleBookmark(card) {
    const index = cards.indexOf(card)
    setCards([
      ...cards.slice(0, index),
      { ...card, bookmarked: !card.bookmarked },
      ...cards.slice(index + 1),
    ])
  }

  console.log(cards)

  return (
    <Router>
      <Grid>
        <Route
          exact
          path="/"
          render={() => (
            <HomePage
              cards={cards.filter(card => !card.bookmarked)}
              onBookmark={toggleBookmark}
            />
          )}
        />
        <Route
          path="/explore"
          render={() => (
            <ExplorePage
              cards={cards}
              onGeneClick={filterByGene}
              onBookmark={toggleBookmark}
            />
          )}
        />
        <Route
          path="/saved"
          render={() => (
            <SavedPage
              cards={cards.filter(card => card.bookmarked)}
              onBookmark={toggleBookmark}
            />
          )}
        />
        <Route
          path="/artwork/:id"
          render={({ match }) => (
            <SingleCardPage
              onBookmark={toggleBookmark}
              id={match.params.id}
              card={cards.find(card => card.id === match.params.id)}
            />
          )}
        />

        <Route path="/artsy" component={ArtsyCards} />
        <Nav>
          <StyledLink exact to="/">
            Home
          </StyledLink>
          <StyledLink to="/explore">Explore</StyledLink>
          <StyledLink to="/saved">Saved</StyledLink>
        </Nav>
        <GlobalStyle />
      </Grid>
    </Router>
  )
}

export default App
