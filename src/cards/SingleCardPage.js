import React from 'react'

export default function SingleCardPage({ card }) {
  return (
    <div>
      <h3>ID: {card.id}</h3>
      <div>{card.image}</div>
      <div>{card.author}</div>
      <p>{card.title}</p>
    </div>
  )
}
