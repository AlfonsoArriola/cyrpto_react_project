import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import axios from 'axios'
import Home from './Home.js'
import Results from './Results.js'

class Layout extends Component {
  constructor () {
    super()
    this.state = {
      name: 'A',
      location: 'home',
      date: moment(),
      data: '',
      cryptoAmount: 1
    }

      this.routingSystem = 
      this.routingSystem.bind(this)
      this.handleDateChange = 
      this.handleDateChange.bind(this)
      this.apiCall = 
      this.apiCall.bind(this)
      this.onInputChange = 
      this.onInputChange.bind(this)
  }

  componentWillMount() {
    var self = this;
     axios.get(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=BTC,USD,EUR&ts=${moment().unix()}&extraParams=crypto_profits_aa`)
                .then(function (response) {
                  
                  self.setState({
                    btcToday: response.data.BTC
                  }, () => {
                      console.log(self.state);
                  })
                })
                .catch(function (error) {
                  console.log(error);
                });
  }


routingSystem(){
  switch(this.state.location) {
      case 'home':
          return <Home handleDateChange={this.handleDateChange} globalState={this.state} onInputChange={this.onInputChange}/>
          break;
      case 'results':
          return <Results />
          break;
      default:
          return <Home />
  }
}

  handleDateChange(date) {
    this.setState({
      date: date
    }, ()=> console.log(this.state.date.unix()));
  }

  onInputChange(event){
       this.setState({
        cryptoAmount: event.target.value
       })
  }
  
  apiCall(){
    //https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=BTC,USD,EUR&ts=1535562213&extraParams=crypto_profits_aa
      var self = this;

      axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=BTC,USD,EUR&ts=1535562213&extraParams=crypto_profits_aa')
                .then(function (response) {
                  
                  self.setState({
                    data: response.data.BTC
                  }, () => {

                     console.log(self.state);

                            // COST PRICE = 108.78
                            // SELLNG PRICE = 16467.91
                            // GAIN = SP - CP 
                            // 16467.91 - 108.78 = 16359.13
                            // GAINS = (GAIN/CP) * 100
                            // (16359.13/108.78) * 100 = 15038.729545872403015
                            // LOSS = CP - SP
                            // 108.78 - 16467.91 = 16359.13
                            // LOSS% = (LOSS/CP)
                            // (-16359.13/100.78) * 100 = 15038.729545872403015
                            const CP =  self.state.data.USD
                            var newCP = (self.state.cryptoAmount * 100)
                            newCP = (newCP * CP)/100
                            const SP = self.state.btcToday.USD;
                            var newSP = (self.state.cryptoAmount  * 100)
                            newSP = (newSP * SP)/100

                              if (newCP < newSP) {
                                 var gain = newSP - newCP
                                 var gainPercent = (gain/newCP) * 100
                                 gainPercent = gainPercent.toFixed(2)
                                 console.log(`profit percent is ${gainPercent}`)
                              } else {
                                 var loss = newCP - newSP
                                 var lossPercent = (loss/newCP) * 100
                                  lossPercent = lossPercent.toFixed(2)
                                   console.log(`loss percent is ${lossPercent}`)
                              }

                  })
                })
                .catch(function (error) {
                  console.log(error);
                });
  }

  render () {
    return (<div className='home'>
   
          <div className='container'>
               <header>
                 <div className='logo' onClick={this.apiCall}>
                   Crypto Profits
                 </div>
                   
                  <nav className="menu">
                    <a href='#' className="main-btn">Register</a>
                  </nav>


               </header>

               {this.routingSystem()}

          </div>
      </div>)
  }
}

const app = document.getElementById('app')

ReactDOM.render(<Layout />, app)
