import React from 'react'
import ExploreThumb from './ExploreThumb'
import Roller from '../images/Roller.svg'
import { LoadingContainer, ExploreContainer } from './ExploreMainStyles'

export function ExploreContentA({ isLoading, topicsA }) {
  if (isLoading) {
    return (
      <LoadingContainer>
        <img alt="Roller" src={Roller} width="60px" height="60px" />
      </LoadingContainer>
    )
  } else if (topicsA.length) {
    return (
      <ExploreContainer>
        {topicsA.map(topic => (
          <ExploreThumb
            image={topic._links.image.href.replace('{image_version}', 'square')}
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

export function ExploreContentB({ isLoading, topicsB }) {
  if (isLoading) {
    return (
      <LoadingContainer>
        <img alt="Roller" src={Roller} width="60px" height="60px" />
      </LoadingContainer>
    )
  } else if (topicsB.length) {
    return (
      <ExploreContainer>
        {topicsB.map(topic => (
          <ExploreThumb
            image={topic._links.image.href.replace('{image_version}', 'square')}
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

export function ExploreContentC({ isLoading, topicsC }) {
  if (isLoading) {
    return (
      <LoadingContainer>
        <img alt="Roller" src={Roller} width="60px" height="60px" />
      </LoadingContainer>
    )
  } else if (topicsC.length) {
    return (
      <ExploreContainer>
        {topicsC.map(topic => (
          <ExploreThumb
            image={topic._links.image.href.replace('{image_version}', 'small')}
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

export function ExploreContentD({ isLoading, topicsD }) {
  if (isLoading) {
    return (
      <LoadingContainer>
        <img alt="Roller" src={Roller} width="60px" height="60px" />
      </LoadingContainer>
    )
  } else if (topicsD.length) {
    return (
      <ExploreContainer>
        {topicsD.map(topic => (
          <ExploreThumb
            image={topic._links.image.href.replace('{image_version}', 'small')}
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

export function ExploreContentE({ isLoading, topicsE }) {
  if (isLoading) {
    return (
      <LoadingContainer>
        <img alt="Roller" src={Roller} width="60px" height="60px" />
      </LoadingContainer>
    )
  } else if (topicsE.length) {
    return (
      <ExploreContainer>
        {topicsE.map(topic => (
          <ExploreThumb
            image={topic._links.image.href.replace('{image_version}', 'small')}
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

export function ExploreContentF({ isLoading, topicsF }) {
  if (isLoading) {
    return (
      <LoadingContainer>
        <img alt="Roller" src={Roller} width="60px" height="60px" />
      </LoadingContainer>
    )
  } else if (topicsF.length) {
    return (
      <ExploreContainer>
        {topicsF.map(topic => (
          <ExploreThumb
            image={topic._links.image.href.replace('{image_version}', 'small')}
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

export function scrollRight1(scrollRef) {
  scrollRef.current.scrollTo({
    top: 0,
    left: 125,
    behavior: 'smooth',
  })
}

export function scrollRight2(scrollRef) {
  scrollRef.current.scrollTo({
    top: 0,
    left: 250,
    behavior: 'smooth',
  })
}

export function scrollRight3(scrollRef) {
  scrollRef.current.scrollTo({
    top: 0,
    left: 375,
    behavior: 'smooth',
  })
}

export function scrollRight4(scrollRef) {
  scrollRef.current.scrollTo({
    top: 0,
    left: 500,
    behavior: 'smooth',
  })
}

export function scrollRight5(scrollRef) {
  scrollRef.current.scrollTo({
    top: 0,
    left: 625,
    behavior: 'smooth',
  })
}

export function scrollRight6(scrollRef) {
  scrollRef.current.scrollTo({
    top: 0,
    left: 750,
    behavior: 'smooth',
  })
}

export function scrollRight7(scrollRef) {
  scrollRef.current.scrollTo({
    top: 0,
    left: 875,
    behavior: 'smooth',
  })
}

export function scrollRight8(scrollRef) {
  scrollRef.current.scrollTo({
    top: 0,
    left: 1000,
    behavior: 'smooth',
  })
}

export function scrollLeft1(scrollRef) {
  scrollRef.current.scrollTo({
    top: 0,
    left: -125,
    behavior: 'smooth',
  })
}
