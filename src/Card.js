import React, { Component } from 'react'
import './Card.css'
export default class Card extends Component {
  render() {
    let angle = Math.random() * 90 - 45
    let xPos = Math.random() * 40 - 20
    let yPos = Math.random() * 40 - 20
    let transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`
    console.log(transform)
    return (
      <div>
        <img
          style={{ transform: transform }}
          className='card'
          src={this.props.image}
          alt={this.props.name}
        />
      </div>
    )
  }
}
