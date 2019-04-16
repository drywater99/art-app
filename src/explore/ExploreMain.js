import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Route } from 'react-router-dom'
import SwipeableRoutes from 'react-swipeable-routes'
import { PageGrid, Title, LinkContainer, StyledLink } from './ExploreMainStyles'
import {
  ExploreContentA,
  ExploreContentB,
  ExploreContentC,
  ExploreContentD,
  ExploreContentE,
  ExploreContentF,
  scrollRight1,
  scrollRight2,
  scrollRight3,
  scrollRight4,
  scrollRight5,
  scrollLeft1,
} from './ExploreMainFunctions'
import {
  getTopicsAData,
  getTopicsBData,
  getTopicsCData,
  getTopicsDData,
  getTopicsEData,
  getTopicsFData,
} from '../services'

export default function ExploreMain(props) {
  const [topicsA, setTopicsA] = useState([])
  const [topicsB, setTopicsB] = useState([])
  const [topicsC, setTopicsC] = useState([])
  const [topicsD, setTopicsD] = useState([])
  const [topicsE, setTopicsE] = useState([])
  const [topicsF, setTopicsF] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (props.location.pathname.includes('explore/modern')) {
      scrollRight1(scrollRef)
    } else if (props.location.pathname.includes('explore/oldmasters')) {
      scrollRight2(scrollRef)
    } else if (props.location.pathname.includes('explore/nude')) {
      scrollRight3(scrollRef)
    } else if (props.location.pathname.includes('explore/nature')) {
      scrollRight4(scrollRef)
    } else if (props.location.pathname.includes('explore/roman')) {
      scrollRight5(scrollRef)
    } else if (props.location.pathname.includes('explore/all')) {
      scrollLeft1(scrollRef)
    }
  }, [props.location])

  async function getData(getter, setter, name) {
    setIsLoading(true)
    try {
      const res = await getter()
      setter(res.data._embedded[name])
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  async function getTopicsA() {
    getData(getTopicsAData, setTopicsA, 'artworks')
  }

  async function getTopicsB() {
    getData(getTopicsBData, setTopicsB, 'artists')
  }

  async function getTopicsC() {
    getData(getTopicsCData, setTopicsC, 'artworks')
  }

  async function getTopicsD() {
    getData(getTopicsDData, setTopicsD, 'artworks')
  }

  async function getTopicsE() {
    getData(getTopicsEData, setTopicsE, 'artworks')
  }

  async function getTopicsF() {
    getData(getTopicsFData, setTopicsF, 'artworks')
  }

  useEffect(() => {
    getTopicsA()
    getTopicsB()
    getTopicsC()
    getTopicsD()
    getTopicsE()
    getTopicsF()
  }, [])

  const ExploreContentCompA = () => (
    <ExploreContentA
      isLoading={isLoading}
      topicsA={topicsA}
      style={{ height: '100vh', 'overflow-y': 'scroll' }}
    />
  )
  const ExploreContentCompB = () => (
    <ExploreContentB
      isLoading={isLoading}
      topicsB={topicsB}
      style={{ height: '100vh', 'overflow-y': 'scroll' }}
    />
  )
  const ExploreContentCompC = () => (
    <ExploreContentC
      isLoading={isLoading}
      topicsC={topicsC}
      style={{ height: '100vh', 'overflow-y': 'scroll' }}
    />
  )
  const ExploreContentCompD = () => (
    <ExploreContentD
      isLoading={isLoading}
      topicsD={topicsD}
      style={{ height: '100vh', 'overflow-y': 'scroll' }}
    />
  )
  const ExploreContentCompE = () => (
    <ExploreContentE
      isLoading={isLoading}
      topicsE={topicsE}
      style={{ height: '100vh', 'overflow-y': 'scroll' }}
    />
  )
  const ExploreContentCompF = () => (
    <ExploreContentF
      isLoading={isLoading}
      topicsF={topicsF}
      style={{ height: '100vh', 'overflow-y': 'scroll' }}
    />
  )

  return (
    <PageGrid>
      <Title data-cy="header-title">Explore</Title>
      <LinkContainer ref={scrollRef}>
        <StyledLink
          to="/explore/all"
          style={{
            backgroundImage:
              'url("https://d32dm0rphc51dk.cloudfront.net/NOpIAwQa-3r51Cg9qXKbfA/medium.jpg"), linear-gradient(transparent, #525252)',
          }}
        >
          All
        </StyledLink>
        <StyledLink
          to="/explore/modern"
          style={{
            backgroundImage:
              'url("https://d32dm0rphc51dk.cloudfront.net/Jb0xDlIwe2RDTCn_EtOJdw/four_thirds.jpg"), linear-gradient(transparent, #525252)',
          }}
        >
          Modern
        </StyledLink>
        <StyledLink
          to="/explore/oldmasters"
          style={{
            backgroundImage:
              'url("https://d32dm0rphc51dk.cloudfront.net/o1C6-_FV3rp_ZQPVY-hPtw/big_and_tall.jpg"), linear-gradient(transparent, #525252)',
          }}
        >
          Old Masters
        </StyledLink>
        <StyledLink
          to="/explore/nude"
          style={{
            backgroundImage:
              'url("https://d32dm0rphc51dk.cloudfront.net/klLweRmE59XCQnUa13hPQg/big_and_tall.jpg"), linear-gradient(transparent, #525252)',
          }}
        >
          Nude
        </StyledLink>
        <StyledLink
          to="/explore/nature"
          style={{
            backgroundImage:
              'url("https://d32dm0rphc51dk.cloudfront.net/rgsexJnD9jWMJr7yFS0mWg/big_and_tall.jpg"), linear-gradient(transparent, #525252)',
          }}
        >
          Nature
        </StyledLink>
        <StyledLink
          to="/explore/romanticism"
          style={{
            backgroundImage:
              'url("https://d32dm0rphc51dk.cloudfront.net/WukYS86TbdKqyRz9aibVHA/big_and_tall.jpg"), linear-gradient(transparent, #525252)',
          }}
        >
          Roman
        </StyledLink>
      </LinkContainer>
      <SwipeableRoutes>
        <Route path="/explore/all" component={ExploreContentCompA} />
        <Route path="/explore/modern" component={ExploreContentCompB} />
        <Route path="/explore/oldmasters" component={ExploreContentCompC} />
        <Route path="/explore/nude" component={ExploreContentCompD} />
        <Route path="/explore/nature" component={ExploreContentCompE} />
        <Route path="/explore/romanticism" component={ExploreContentCompF} />
      </SwipeableRoutes>
    </PageGrid>
  )
}
