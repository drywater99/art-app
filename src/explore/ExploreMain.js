import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Route } from 'react-router-dom'
import SwipeableRoutes from 'react-swipeable-routes'
import ExploreThumb from './ExploreThumb'
import Roller from '../images/Roller.svg'
import {
  PageGrid,
  Title,
  LinkContainer,
  StyledLink,
  LoadingContainer,
  ExploreContainer,
} from './ExploreMainStyles'
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

  function scrollRight(scrollRef, position) {
    scrollRef.current.scrollTo({
      top: 0,
      left: `${position}`,
      behavior: 'smooth',
    })
  }

  function scrollLeft(scrollRef) {
    scrollRef.current.scrollTo({
      top: 0,
      left: -125,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    if (props.location.pathname.includes('explore/modern')) {
      scrollRight(scrollRef, 125)
    } else if (props.location.pathname.includes('explore/oldmasters')) {
      scrollRight(scrollRef, 250)
    } else if (props.location.pathname.includes('explore/nude')) {
      scrollRight(scrollRef, 375)
    } else if (props.location.pathname.includes('explore/nature')) {
      scrollRight(scrollRef, 500)
    } else if (props.location.pathname.includes('explore/roman')) {
      scrollRight(scrollRef, 625)
    } else if (props.location.pathname.includes('explore/all')) {
      scrollLeft(scrollRef, '-125')
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

  return (
    <PageGrid>
      <Title data-cy="header-title">Explore</Title>
      <LinkContainer ref={scrollRef}>
        {themeButton('all', 'NOpIAwQa-3r51Cg9qXKbfA/medium', 'All')}
        {themeButton('modern', 'Jb0xDlIwe2RDTCn_EtOJdw/four_thirds', 'Modern')}
        {themeButton(
          'oldmasters',
          'o1C6-_FV3rp_ZQPVY-hPtw/big_and_tall',
          'Old Masters'
        )}
        {themeButton('nude', 'klLweRmE59XCQnUa13hPQg/big_and_tall', 'Nude')}
        {themeButton('nature', 'rgsexJnD9jWMJr7yFS0mWg/big_and_tall', 'Nature')}
        {themeButton(
          'romanticism',
          'WukYS86TbdKqyRz9aibVHA/big_and_tall',
          'Roman'
        )}
      </LinkContainer>
      <SwipeableRoutes>
        <Route path="/explore/all" component={RenderContentCompA} />
        <Route path="/explore/modern" component={RenderContentCompB} />
        <Route path="/explore/oldmasters" component={RenderContentCompC} />
        <Route path="/explore/nude" component={RenderContentCompD} />
        <Route path="/explore/nature" component={RenderContentCompE} />
        <Route path="/explore/romanticism" component={RenderContentCompF} />
      </SwipeableRoutes>
    </PageGrid>
  )

  function themeButton(url, image, name) {
    return (
      <StyledLink
        to={`/explore/${url}`}
        style={{
          backgroundImage: `url(https://d32dm0rphc51dk.cloudfront.net/${image}.jpg), linear-gradient(transparent, #525252)`,
        }}
      >
        {name}
      </StyledLink>
    )
  }

  function ExploreContent(array) {
    if (isLoading) {
      return (
        <LoadingContainer>
          <img alt="Roller" src={Roller} />
        </LoadingContainer>
      )
    } else if (array.length) {
      return (
        <ExploreContainer>
          {array.map(topic => (
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
          <img alt="Roller" src={Roller} />
        </LoadingContainer>
      )
    }
  }

  function ExploreContentA() {
    return ExploreContent(topicsA)
  }

  function RenderContentCompA() {
    return (
      <ExploreContentA style={{ height: '100vh', 'overflow-y': 'scroll' }} />
    )
  }

  function ExploreContentB() {
    return ExploreContent(topicsB)
  }

  function RenderContentCompB() {
    return (
      <ExploreContentB style={{ height: '100vh', 'overflow-y': 'scroll' }} />
    )
  }

  function ExploreContentC() {
    return ExploreContent(topicsC)
  }

  function RenderContentCompC() {
    return (
      <ExploreContentC style={{ height: '100vh', 'overflow-y': 'scroll' }} />
    )
  }

  function ExploreContentD() {
    return ExploreContent(topicsD)
  }

  function RenderContentCompD() {
    return (
      <ExploreContentD style={{ height: '100vh', 'overflow-y': 'scroll' }} />
    )
  }

  function ExploreContentE() {
    return ExploreContent(topicsE)
  }

  function RenderContentCompE() {
    return (
      <ExploreContentE style={{ height: '100vh', 'overflow-y': 'scroll' }} />
    )
  }

  function ExploreContentF() {
    return ExploreContent(topicsF)
  }

  function RenderContentCompF() {
    return (
      <ExploreContentF style={{ height: '100vh', 'overflow-y': 'scroll' }} />
    )
  }
}
