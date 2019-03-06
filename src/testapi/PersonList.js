import React from 'react'
import axios from 'axios'

export default class PersonList extends React.Component {
  state = {
    people: [],
  }

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then(res => {
      this.setState({ people: res.data })
    })
  }

  render() {
    return (
      <ul>
        {this.state.people.map(person => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
    )
  }
}
