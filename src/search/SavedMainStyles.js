import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import Scope from '../images/Scope.svg'

export const PageGrid = styled.div`
  display: grid;
  grid-template-rows: auto auto auto 1fr;
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

export const HeadlineContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 20px;
  padding: 25px 25px 10px 25px;
`

export const ResultContainer = styled.section`
  display: grid;
  grid-template-columns: 150px 150px;
  grid-template-rows: auto;
  grid-column-gap: 21px;
  grid-row-gap: 22px;
  padding: 25px;
  overflow-y: scroll;
`

export const LoadingContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  margin: 10px 0 10px 0;
`

export const StyledInput = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ededed;
  background-image: url(${Scope});
  background-size: 6%;
  background-position: 295px 10px;
  background-repeat: no-repeat;
  width: 90vw;
  height: 40px;
  padding: 0 16px 4px 16px;
  border-radius: 25px;
  border-style: none;
  outline: none;
  font-size: 18px;
  font-weight: regular;
  color: #bababa;
  ::placeholder {
    color: #949494;
  }
`

export const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-bottom: 1px solid #d0d0d0;
  margin: 0 20px;
`

export const StyledLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  color: #949494;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: bold;
  font-size: 16px;
  text-decoration: none;
  width: 150%;
  &.active {
    border-bottom: 2px solid #383838;
    color: #383838;
    padding: 9px;
  }
`
