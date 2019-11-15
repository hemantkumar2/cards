
import React, { Component } from 'react'
import axios from 'axios'
import Card from './Card'
const API_URL_BASE = "https://deckofcardsapi.com/api/deck/"
export default class Deck extends Component {
  constructor(props) {
    super(props)

    this.state = {
      deck: null,
      drawn: []
    }
    this.getCard = this.getCard.bind(this)
  }

  async componentDidMount() {
    let deck = await axios.get(`${API_URL_BASE}new/shuffle/`)
    console.log(deck)
    this.setState({ deck: deck.data })
  }

  async getCard() {
    let deck_id = this.state.deck.deck_id
    try {
      let cardUrl = `${API_URL_BASE}/${deck_id}/draw/`
      let cardRes = await axios.get(cardUrl)
      if (!cardRes.data.success) {
        throw new Error('no cards remaining')
      }
      console.log(cardRes.data)
      let card = cardRes.data.cards[0]
      this.setState(st => ({
        drawn: [
          ...st.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.value} of ${card.suit}`
          }
        ]
      }))
    } catch (err) {
      alert(err)
    }
  }

  render() {
    const cards = this.state.drawn.map(c => (
      <Card key={c.id} name={c.name} image={c.image} />
    ))
    return (
      <div>
        <h1 className='card-title'>Card dealer</h1>
        <h2 className='card-title card-subtitle'>A little demo made with react</h2>
        <button className='card-btn' onClick={this.getCard}>Get cards</button>
        <div className='card-margin'>
          {cards}
        </div>
      </div>
    )
  }
}
