import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const PageGrid = styled.section`
  position: relative;
  align-content: flex-start;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`

export const ContentContainer = styled.section`
  display: grid;
  align-content: flex-start;
  margin: 25px 25px 0 25px;
  padding: 0 0 25px 0;
  border-bottom: 1px solid #bababa;
`

export const ImageCard = styled.div`
  z-index: -1;
  height: 450px;
  width: 100vw;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  margin-bottom: 20px;
`

export const CancelButtonContainer = styled.div`
  position: fixed;
  right: 28px;
  top: 24px;
`

export const BookmarkContainer = styled.section`
  display: flex;
  justify-content: flex-end;
  height: 20px;
  margin: 0 28px 0;
`

export const FullImage = styled.img`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 30px 25px 30px 25px;
  width: 100%;
  .fill {
    object-fit: fill;
  }
`

export const ExploreContainer = styled.section`
  display: grid;
  grid-template-columns: 150px 150px;
  grid-template-rows: auto;
  grid-column-gap: 21px;
  grid-row-gap: 18px;
  padding: 25px;
`

export const ContentTitle = styled.section`
  display: grid;
  align-content: flex-start;
  margin: 10px 25px 0px 25px;
  padding: 0 0 25px 0;
  border-bottom: 1px solid #bababa;
`

export const SectionTitle = styled.section`
  display: grid;
  align-content: flex-start;
  margin: 0 25px 0px 25px;
  padding: 25px 0 0 0;
  border-top: 1px solid #bababa;
`

export const StyledLink = styled(Link)`
  text-decoration: none;
`

export const ExploreContainerX = styled.section`
  display: grid;
  grid-auto-flow: column;
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  scroll-padding: 0 25px 0 25px;
  height: fit-content;
  padding: 25px 25px 30px 25px;
`
export const LoadingContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`
