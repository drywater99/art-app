import React from 'react'
import styled from 'styled-components'

const Grid = styled.section`
  display: grid;
  grid-auto-flow: column;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
`

const Link = styled.div`
  display: flex;
  scroll-snap-align: start;
  white-space: nowrap;
  cursor: default;
  align-items: flex-end;
  justify-content: center;
  margin: 4px;
  width: 102px;
  height: 60px;
  padding: 24px 12px 12px 8px;
  flex: 1 1;
  background-color: #d8d8d8;
  border-radius: 6px;
  font-weight: bold;
  color: #fcfcfc;
  text-decoration: ${p => (p.isActive ? 'underline' : '')};
`

export default function Filter({ items, active, onClick }) {
  return (
    <Grid>
      {items.map(item => (
        <Link
          key={item}
          isActive={item === active}
          onClick={() => onClick(item)}
        >
          {item}
        </Link>
      ))}
    </Grid>
  )
}
