import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter =
    ({ handler, text }) =>
        <>
            {text}: <input onChange={handler} />
        </>

const Button =
    ({ text, handler }) =>
        <>
            <button
                onClick={handler}
            >
                {text}
            </button>
        </>

const List =
    ({ countries, controller }) =>
        <>
            {countries.map((country, idx) =>
                <div key={idx+1}>
                    {country.name.common}
                    <Button
                        text={"show"}
                        handler={() => controller({ type: "SHOW", payload: country.name.common })}
                    />
                </div>
            )}
        </>

const Weather =
    ({ weather, capital }) =>
        <>
            <h2>weather in {capital}</h2>
            <p>{weather}</p>
        </>

const Country =
    ({ country, weather }) =>
        <>
            <h1>{country.name.common}</h1>
            <p>Capital: {country?.capital}</p>
            <p>Population: {country?.population}</p>
            <h2>languages</h2>
            <ul>
                {Object.values(country?.languages).map(lang =>
                    <li key={lang}>
                        {lang}
                    </li>
                )}
            </ul>
            <img src={country?.flags.png} alt={"country flag"} />
            {country.capital
                ? <Weather weather={weather} capital={country.capital}/>
                : <h2>no weather to report</h2>
            }
        </>

const Results =
    ({ countries, controller }) =>
        <>
            {countries.length > 10
                ? <p>Please narrow down the search</p>
                : countries.length > 0
                    ? <List countries={countries} controller={controller} />
                    : <p>Nuthin</p>
            }
        </>


const App =
    () => {
        const api_key_weather = process.env.REACT_APP_API_KEY_WEATHER
        const init = { countries: [], toShow: [], details: null, weather: null }
        const [ model, update ] = useState(init)
        const getCountries =
            () => {
                axios
                    .get("https://restcountries.com/v3.1/all")
                    .then(res => controller({ type: "GET_SUCCESS", payload: res }))
            }
        const getWeather =
            () => {
                if (model.details && model.details.capital) {
                    axios
                        .get(`https://api.openweathermap.org/data/2.5/weather?q=${model.details.capital}&appid=${api_key_weather}`)
                        .then(res => controller({ type: "WEATHER_SUCCESS", payload: res }))
                }
            }
        useEffect(getCountries, [])
        useEffect(getWeather, [model.details])

        function controller(msg) {
            switch (msg.type) {
                case "GET_SUCCESS": {
                    model.countries = Array.from(msg.payload.data)
                    update({...model, toShow: model.countries})
                    break
                }
                case "WEATHER_SUCCESS": {
                    model.weather =
                        msg.payload.data.weather[0].description
                    update({...model})
                    break
                }
                case "FILTER": {
                    const val = msg.payload.target.value
                    model.toShow =
                        model.countries.filter(c => c.name.common.toLowerCase().includes(val.toLowerCase()))
                    model.details = null
                    model.weather = null
                    update({...model})
                    break
                }
                case "SHOW": {
                    model.details =
                        model.toShow.find(c => c.name.common === msg.payload)
                    update({...model})
                    break
                }
                default: {
                    break
                }
            }
        }

        return (
            <div>
                <Filter
                    handler={e => controller({ type: "FILTER", payload: e })}
                    text={"find"}
                />
                {model.details
                    ? <Country country={model.details} weather={model.weather} />
                    : <Results countries={model.toShow} controller={controller} />
                }
            </div>
        )
    }

export default App;
