import React, { Component } from 'react';
import './App.css';
import data from './continents.json'

const initialState = {
  continentFocus: false,
  countryFocus: false,
  text: '',
  continent: '',
  countries: {}
}

export default class App extends Component {
  state = initialState

  onChange = e => this.setState({ text: e.target.value })

  onContinentFocus = e => this.setState({ ...initialState, continentFocus: true })

  onContinentSelect = continent => this.setState({ continent: continent, continentFocus: false })

  onCountryFocus = e => this.setState({ countryFocus: true })

  onCountryToggle = (e, country) => 
    this.setState({ countries: { ...this.state.countries, [country.flag]: e.target.checked } })

  onClear = e => this.setState({ countryFocus: false, countries: {} })

  render() {
    const { text, continentFocus, countryFocus, continent, countries } = this.state

    return (
      <div className='app'>
        <h1>Flag Picker</h1>
        <p>This app will help you learn flags around the world in 3 steps.</p>
        <div className='step'>
          <div className='header'>
            <h1 className='title'>Step 1</h1>
            <p className='subtitle'>Select a continent</p>
          </div>
          <input 
            type='text'
            value={text}
            onChange={this.onChange}
            onFocus={this.onContinentFocus}
          />
          {continentFocus && (
            <ul>
              {data.map(item => {
                if (text.charAt(0).toUpperCase() === item.continent.substr(0, text.length)) {
                  return <li key={item.continent} onClick={() => this.onContinentSelect(item.continent)}>{item.continent}</li>
                }
              })}
            </ul>
          )}
          {continent && (
            <div>
              <p>You selected</p>
              <h1>{continent}</h1>
            </div>
          )}
        </div>
        {continent && (
          <div className='step'>
            <h1>Step 2</h1>
            <p>Now select a country.</p>
            <input 
              type='text' 
              readOnly={true}
              onFocus={this.onCountryFocus}
            />
            {countryFocus && (
              <ul>
                {data.map(item => item.continent === continent && (
                  item.countries.map(country => (
                    <div key={country.name}>
                      <label>{country.name}</label>
                      <input type='checkbox' onClick={e => this.onCountryToggle(e, country)}/>
                    </div>
                  ))
                ))}
              </ul>
            )}
          </div>
        )}
        {!!Object.keys(countries).length && (
          <div className='step'>
            <h1>Selected flags:</h1>
            <div>
              {Object.keys(countries).map(country => 
                !!countries[country] && <p key={country}>{country}</p>
              )}
            </div>
            <button onClick={this.onClear}>Clear flags</button>
          </div>
        )}
      </div>
    )
  }
} 
