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
  scrollRight6,
  scrollRight7,
  scrollRight8,
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
    if (props.location.pathname.includes('explore/all')) {
      getTopicsA()
    } else if (props.location.pathname.includes('explore/modern')) {
      getTopicsB()
      scrollRight1(scrollRef)
    } else if (props.location.pathname.includes('explore/oldmasters')) {
      getTopicsC()
      scrollRight2(scrollRef)
    } else if (props.location.pathname.includes('explore/nude')) {
      getTopicsD()
      scrollRight3(scrollRef)
    } else if (props.location.pathname.includes('explore/nature')) {
      getTopicsE()
      scrollRight4(scrollRef)
    } else if (props.location.pathname.includes('explore/roman')) {
      getTopicsF()
      scrollRight5(scrollRef)
    } else if (props.location.pathname.includes('explore/foo')) {
      getTopicsB()
      scrollRight6(scrollRef)
    } else if (props.location.pathname.includes('explore/repeat')) {
      getTopicsC()
      scrollRight7(scrollRef)
    } else if (props.location.pathname.includes('explore/test')) {
      getTopicsD()
      scrollRight8(scrollRef)
    }
    if (props.location.pathname.includes('explore/all')) {
      scrollLeft1(scrollRef)
    }
  }, [props.location])

  async function getTopicsA() {
    setIsLoading(true)
    try {
      const res = await getTopicsAData()
      setTopicsA(res.data._embedded.artworks)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }
  async function getTopicsB() {
    setIsLoading(true)
    try {
      const res = await getTopicsBData()
      setTopicsB(res.data._embedded.artists)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }
  async function getTopicsC() {
    try {
      setIsLoading(true)
      const res = await getTopicsCData()
      setTopicsC(res.data._embedded.artworks)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }
  async function getTopicsD() {
    setIsLoading(true)
    try {
      const res = await getTopicsDData()
      setTopicsD(res.data._embedded.artworks)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }
  async function getTopicsE() {
    setIsLoading(true)
    try {
      const res = await getTopicsEData()
      setTopicsE(res.data._embedded.artworks)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }
  async function getTopicsF() {
    setIsLoading(true)
    try {
      const res = await getTopicsFData()
      setTopicsF(res.data._embedded.artworks)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

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
        <StyledLink
          to="/explore/foo"
          style={{
            backgroundImage:
              'url("https://d32dm0rphc51dk.cloudfront.net/Jb0xDlIwe2RDTCn_EtOJdw/four_thirds.jpg"), linear-gradient(transparent, #525252)',
          }}
        >
          Modern
        </StyledLink>
        <StyledLink
          to="/explore/repeat"
          style={{
            backgroundImage:
              'url("https://d32dm0rphc51dk.cloudfront.net/o1C6-_FV3rp_ZQPVY-hPtw/big_and_tall.jpg"), linear-gradient(transparent, #525252)',
          }}
        >
          Old Masters
        </StyledLink>
        <StyledLink
          to="/explore/test"
          style={{
            backgroundImage:
              'url("https://d32dm0rphc51dk.cloudfront.net/klLweRmE59XCQnUa13hPQg/big_and_tall.jpg"), linear-gradient(transparent, #525252)',
          }}
        >
          Nude
        </StyledLink>
      </LinkContainer>
      <SwipeableRoutes>
        <Route path="/explore/all" component={ExploreContentCompA} />
        <Route path="/explore/modern" component={ExploreContentCompB} />
        <Route path="/explore/oldmasters" component={ExploreContentCompC} />
        <Route path="/explore/nude" component={ExploreContentCompD} />
        <Route path="/explore/nature" component={ExploreContentCompE} />
        <Route path="/explore/romanticism" component={ExploreContentCompF} />
        <Route path="/explore/foo" component={ExploreContentCompB} />
        <Route path="/explore/repeat" component={ExploreContentCompC} />
        <Route path="/explore/test" component={ExploreContentCompD} />
      </SwipeableRoutes>
    </PageGrid>
  )
}
