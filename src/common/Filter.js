import React from 'react'
import styled from 'styled-components'

const Grid = styled.section`
  display: grid;
  grid-auto-flow: column;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding: 5px 0 0 20px;
  scroll-padding: 0 25px;
`

const Link = styled.div`
  display: flex;
  white-space: nowrap;
  scroll-padding: 20px;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  cursor: default;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  align-items: flex-end;
  justify-content: center;
  margin: 4px;
  width: 102px;
  height: 60px;
  padding: 24px 12px 12px 8px;
  flex: 1 1;
  background-color: #d8d8d8;
  border-radius: 6px;
  font-size: 12px;
  font-weight: bold;
  color: #fcfcfc;
  text-decoration: ${p => (p.isActive ? 'underline' : '')};
`

export default function Filter({ gene, name, active, onGeneClick, image }) {
  return (
    <Grid>
      <Link
        style={{ backgroundImage: 'url(' + image + ')' }}
        key={gene}
        isActive={gene === active}
        onClick={() => onGeneClick(gene.urlApi)}
      >
        {name}
      </Link>
    </Grid>
  )
}
