import styled from 'styled-components'

export const PageGrid = styled.div`
  grid-template-rows: auto 1fr;
  overflow: scroll;
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

export const StartLogo = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #383838;
  font-weight: 900;
  font-size: 36px;
  line-height: 36px;
  letter-spacing: 0.1em;
  pointer-events: none;
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: #fcfcfc;
  z-index: 20;
  animation: fade-out 3.5s normal ease-out;
  animation-fill-mode: forwards;
  @keyframes fade-out {
    0% {
      opacity: 1;
    }
    75% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`

export const CardContainer = styled.section`
  display: grid;
  align-content: flex-start;
  justify-content: center;
  grid-gap: 12px;
  padding: 4px 12px 30px;
  overflow-y: scroll;
`
export const AvatarContainer = styled.section`
  display: grid;
  grid-auto-flow: column;
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  scroll-padding: 0 25px 0 25px;
  height: fit-content;
  padding: 25px;
`

export const TitleContainer = styled.div`
  margin: 0 25px 0 25px;
  border-top: 1px solid #bababa;
`
export const ContentTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  font-weight: bold;
  font-size: 25px;
  margin-top: 25px;
  color: #383838;
  overflow: scroll;
`
export const LoadingContainer = styled.section`
  display: flex;
  align-items: center;
  height: 100vh;
  justify-content: center;
`
