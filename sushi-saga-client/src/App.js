import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';
import SushiWallet from './components/SushiWallet'

// Endpoint!
const API = "http://localhost:3001/sushis"

let lastIndex = 0

class App extends Component {

  constructor() {
    super()

    this.state = {
      sushis: [],
      displayedSushi: [],
      moneyLeft: 100,
    }
  }

  renderFourSushis = () => {
    let displayedSushi = []
    if(lastIndex + 4 > this.state.sushis.length) {
      for(let i = lastIndex; i < lastIndex + 4; i++) {
        if(i < this.state.sushis.length) {displayedSushi.push(this.state.sushis[i])}
        else{
          displayedSushi.push(this.state.sushis[i - this.state.sushis.length])
        }
      }
      lastIndex = lastIndex + 4 - this.state.sushis.length
    }else{
      for(let i = lastIndex; i < lastIndex + 4; i++) {
        displayedSushi.push(this.state.sushis[i])
      }
      lastIndex += 4
    }
    this.setState({displayedSushi})
  }

  buySushi = (price, sushi) => {
    if(this.state.moneyLeft >= price) {
      let sushis = [...this.state.sushis]
      const boughtSushiIndex = sushis.indexOf(sushi)
      sushis[boughtSushiIndex].img_url = null
      this.setState(prevState => {
        return {
          moneyLeft: prevState.moneyLeft - price,
          sushis,
        }
      })
    }
  }

  addMoneyToWallet = amount => {
    this.setState(prevState => {
      console.log(typeof(prevState.moneyLeft), typeof(amount))
      return {moneyLeft: prevState.moneyLeft + parseInt(amount)}
    })
  }

  render() {
    return (
      <div className="app">
        <SushiContainer displayedSushi={this.state.displayedSushi.length === 4 ? this.state.displayedSushi : []} renderFourSushis={this.renderFourSushis} buySushi={this.buySushi} />
        <Table moneyLeft={this.state.moneyLeft} />
        <SushiWallet addMoneyToWallet={this.addMoneyToWallet} />
      </div>
    );
  }

  componentDidMount() {
    fetch(API)
      .then(resp => resp.json())
      .then(sushis => {
        this.setState({sushis: [...sushis]}, this.renderFourSushis)
      })
  }
}

export default App;