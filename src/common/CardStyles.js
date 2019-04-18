import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const BorderCard = styled.section`
  padding: 30px 0 0;
  filter: drop-shadow(0 10px 10px #cccccc);
`
export const StyledLink = styled(Link)`
  text-decoration: none;
`

export const ImageCardArtwork = styled.div`
  height: 280px;
  width: 325px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  border-radius: 12px 12px 0 0;
  position: relative;
`

export const ImageCard = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: 380px;
  width: 325px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  padding: 22px 20px 20px 22px;
  border-radius: 12px;
`
export const ShowTitle = styled.p`
  margin-top: 5px;
  margin-bottom: 8px;
  color: #fcfcfc;
  font-weight: 900;
  font-size: 26px;
  line-height: 32px;
  letter-spacing: 0.1em;
  text-shadow: 1px 1px 7px #515151;
`

export const Category = styled.p`
  text-transform: uppercase;
  font-weight: bold;
  color: #fcfcfc;
  font-size: 15px;
  margin: 0;
  letter-spacing: 0.1em;
  text-shadow: 1px 1px 7px #515151;
`
export const ContentCard = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 325px;
  padding: 22px 20px 20px 22px;
  background: #fafafa;
  border-radius: 0 0 12px 12px;
`
