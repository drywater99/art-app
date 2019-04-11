import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const PageGrid = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr;
  overflow: hidden;
`
export const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  font-weight: bold;
  font-size: 25px;
  margin: 15px 24px 0;
  color: #383838;
  overflow: scroll;
`

export const LinkContainer = styled.header`
  display: grid;
  grid-auto-flow: column;
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  scroll-padding: 0 5px 0 5px;
  padding: 10px 0 8px 2px;
`
export const StyledLink = styled(NavLink)`
  display: flex;
  white-space: nowrap;
  scroll-padding: 10px;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  cursor: default;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-blend-mode: darken;
  align-items: flex-end;
  justify-content: center;
  margin: 5px 0 0 6px;
  width: 110px;
  height: 70px;
  padding: 24px 12px 12px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 0.12em;
  color: #e0e0e0;
  text-decoration: none;
  &.active {
    text-decoration: underline;
    background-blend-mode: darken;
    color: #fcfcfc;
  }
`

export const LoadingContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
`

export const ExploreContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-column-gap: 6px;
  grid-row-gap: 6px;
  padding: 8px 6px 6px 6px;
  overflow-y: scroll;
  border-top: 1px solid #d0d0d0;
`
