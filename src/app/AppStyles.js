import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Grid = styled.div`
  display: grid;
  grid-template-rows: auto 48px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const Nav = styled.nav`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 2px;
  color: #efefef;
  border-top: #949494 solid 1px;
`

export const StyledLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  font-weight: bold;
  font-size: 12px;
  color: #383838;
  opacity: 50%;
  text-decoration: none;
  &.active {
    text-decoration: underline;
  }
`
