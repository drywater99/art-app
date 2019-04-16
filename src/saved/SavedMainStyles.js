import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import Scope from '../images/Scope.svg'

export const PageGrid = styled.div`
  display: grid;
  grid-template-rows: auto auto auto 1fr;
  overflow-y: hidden;
  margin: 0 24px 0 24px;
`

export const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  font-weight: bold;
  font-size: 25px;
  margin-top: 15px;
  color: #383838;
  overflow: scroll;
`

export const HeadlineContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 20px;
  padding: 25px 0 10px 0;
`

export const ResultContainer = styled.section`
  display: grid;
  grid-template-columns: 140px 140px;
  grid-template-rows: auto;
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  padding: 16px 12px 12px 12px;
  overflow-y: scroll;
`

export const LoadingContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StyledForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0 15px 0;
  background-color: #ededed;
  background-image: url(${Scope});
  background-size: 6%;
  background-position: 15px 10px;
  background-repeat: no-repeat;
  height: 40px;
  padding: 0 16px 0 45px;
  border-radius: 25px;
`

export const StyledInput = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ededed;
  border-style: none;
  width: auto;
  outline: none;
  font-size: 16px;
  font-weight: regular;
  color: #383838;
  ::placeholder {
    color: #949494;
  }
`
export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`

export const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  border-bottom: 1px solid #d0d0d0;
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
    color: #383838;
    transition: 0.4s ease-in-out;
  }
`

export const ActiveUnderline = styled.div`
  height: 0.18em;
  width: 50%;
  margin: 0;
  background: #383838;
  border: none;
  transition: 0.2s ease-in-out;
`

export const Button = styled.button`
  display: block;
  width: 80%;
  height: 40px;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  color: #383838;
  border-radius: 4px;
  margin: 12px auto;
`
