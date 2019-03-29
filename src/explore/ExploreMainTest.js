import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import SwipeableRoutes from 'react-swipeable-routes'
import styled from 'styled-components'
import ExploreThumb from './ExploreThumb'
import Title from '../common/Title'
import Roller from '../images/Roller.svg'
import {
  getTopicsAData,
  getTopicsBData,
  getTopicsRandomData,
  getTopicsOldMastersData,
} from '../services'

const PageGrid = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr;
  overflow: hidden;
`
const LinkContainer = styled.header`
  display: grid;
  grid-auto-flow: column;
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  scroll-padding: 0 5px 0 5px;
  padding: 10px 0 12px 2px;
`
const StyledLink = styled(NavLink)`
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
  margin: 5px 0 0 5px;
  width: 116px;
  height: 60px;
  padding: 24px 12px 12px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: bold;
  color: #fcfcfc;
  &.active {
    border-bottom: 2px solid #383838;
    color: #383838;
    padding: 9px;
  }
`

const LoadingContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`

const ExploreContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-column-gap: 6px;
  grid-row-gap: 6px;
  padding: 15px 6px 6px 6px;
  overflow-y: scroll;
  border-top: 1px solid #d0d0d0;
`

export default function ExploreMainTest({ onTopicClick, topics }) {
  const [topicsA, setTopicsA] = useState([])
  const [topicsB, setTopicsB] = useState([])
  const [oldMasters, setOldMasters] = useState([])
  const [random, setRandom] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function getTopicsA() {
    setIsLoading(true)
    await getTopicsAData()
      .then(res => {
        setTopicsA(res.data._embedded.artists)
      })
      .catch(err => console.log(err))
    setIsLoading(false)
  }

  useEffect(() => {
    getTopicsA()
  }, [])

  async function getTopicsB() {
    setIsLoading(true)
    await getTopicsBData()
      .then(res => {
        setTopicsB(res.data._embedded.artists)
      })
      .catch(err => console.log(err))
    setIsLoading(false)
  }

  useEffect(() => {
    getTopicsB()
  }, [])

  async function getOldMasters() {
    setIsLoading(true)
    await getTopicsOldMastersData()
      .then(res => {
        setOldMasters(res.data._embedded.artworks)
      })
      .catch(err => console.log(err))
    setIsLoading(false)
  }

  useEffect(() => {
    getOldMasters()
  }, [])

  async function getRandom() {
    setIsLoading(true)
    await getTopicsRandomData()
      .then(res => {
        setRandom(res.data._embedded.artworks)
      })
      .catch(err => console.log(err))
    setIsLoading(false)
  }

  useEffect(() => {
    getRandom()
  }, [])

  function ExploreContentA() {
    if (isLoading) {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} width="60px" height="60px" />
        </LoadingContainer>
      )
    } else if (topicsA.length > 0) {
      return (
        <ExploreContainer>
          {topicsA.map(topic => (
            <ExploreThumb
              image={topic._links.image.href.replace(
                '{image_version}',
                'square'
              )}
              {...topic}
              key={topic.id}
            />
          ))}
        </ExploreContainer>
      )
    } else {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} width="60px" height="60px" />
        </LoadingContainer>
      )
    }
  }

  function ExploreContentB() {
    if (isLoading) {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} width="60px" height="60px" />
        </LoadingContainer>
      )
    } else if (topicsB.length > 0) {
      return (
        <ExploreContainer>
          {topicsB.map(topic => (
            <ExploreThumb
              image={topic._links.image.href.replace(
                '{image_version}',
                'square'
              )}
              {...topic}
              key={topic.id}
            />
          ))}
        </ExploreContainer>
      )
    } else {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} width="60px" height="60px" />
        </LoadingContainer>
      )
    }
  }

  function ExploreContentC() {
    if (isLoading) {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} width="60px" height="60px" />
        </LoadingContainer>
      )
    } else if (oldMasters.length > 0) {
      return (
        <ExploreContainer>
          {oldMasters.map(om => (
            <ExploreThumb
              image={om._links.image.href.replace('{image_version}', 'small')}
              {...om}
              key={om.id}
            />
          ))}
        </ExploreContainer>
      )
    } else {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} width="60px" height="60px" />
        </LoadingContainer>
      )
    }
  }

  function ExploreContentD() {
    if (isLoading) {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} width="60px" height="60px" />
        </LoadingContainer>
      )
    } else if (random.length > 0) {
      return (
        <ExploreContainer>
          {random.map(r => (
            <ExploreThumb
              image={r._links.image.href.replace('{image_version}', 'small')}
              {...r}
              key={r.id}
            />
          ))}
        </ExploreContainer>
      )
    } else {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} width="60px" height="60px" />
        </LoadingContainer>
      )
    }
  }

  const ExploreContentCompA = () => (
    <ExploreContentA style={{ height: '100vh', 'overflow-y': 'scroll' }} />
  )

  const ExploreContentCompB = () => (
    <ExploreContentB style={{ height: '100vh', 'overflow-y': 'scroll' }} />
  )
  const ExploreContentCompC = () => (
    <ExploreContentC style={{ height: '100vh', 'overflow-y': 'scroll' }} />
  )

  const ExploreContentCompD = () => (
    <ExploreContentD style={{ height: '100vh', 'overflow-y': 'scroll' }} />
  )
  const ExploreContentCompE = () => (
    <ExploreContentD style={{ height: '100vh', 'overflow-y': 'scroll' }} />
  )
  const ExploreContentCompF = () => (
    <ExploreContentD style={{ height: '100vh', 'overflow-y': 'scroll' }} />
  )
  const image =
    'https://d32dm0rphc51dk.cloudfront.net/DsYeaxMGPVgQEC09yVj0KQ/big_and_tall.jpg'

  return (
    <Router>
      <PageGrid>
        <Title data-cy="header-title">Explore</Title>
        <LinkContainer>
          <StyledLink
            to="/explore/Renaissance"
            style={{
              backgroundImage:
                'url(' + image + '), linear-gradient(transparent, #525252)',
            }}
          >
            Renaissance
          </StyledLink>
          <StyledLink
            to="/explore/Design"
            style={{
              backgroundImage:
                'url(' + image + '), linear-gradient(transparent, #525252)',
            }}
          >
            Design
          </StyledLink>
          <StyledLink
            to="/explore/oldmasters"
            style={{
              backgroundImage:
                'url(' + image + '), linear-gradient(transparent, #525252)',
            }}
          >
            Old Masters
          </StyledLink>
          <StyledLink
            to="/explore/random"
            style={{
              backgroundImage:
                'url(' + image + '), linear-gradient(transparent, #525252)',
            }}
          >
            Old Masters
          </StyledLink>
          <StyledLink
            to="/explore/random1"
            style={{
              backgroundImage:
                'url(' + image + '), linear-gradient(transparent, #525252)',
            }}
          >
            Old Masters
          </StyledLink>
          <StyledLink
            to="/explore/random2"
            style={{
              backgroundImage:
                'url(' + image + '), linear-gradient(transparent, #525252)',
            }}
          >
            Random
          </StyledLink>
        </LinkContainer>
        <SwipeableRoutes>
          <Route path="/explore/Renaissance" component={ExploreContentCompA} />
          <Route path="/explore/Design" component={ExploreContentCompB} />
          <Route path="/explore/oldmasters" component={ExploreContentCompC} />
          <Route path="/explore/random" component={ExploreContentCompD} />
          <Route path="/explore/random1" component={ExploreContentCompE} />
          <Route path="/explore/random2" component={ExploreContentCompF} />
        </SwipeableRoutes>
      </PageGrid>
    </Router>
  )
}
