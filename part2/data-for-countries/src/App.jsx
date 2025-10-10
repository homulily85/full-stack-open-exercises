import {useEffect, useState} from "react";
import axios from "axios";


const MultipleSearchResultDisplay = ({countries}) => {
    if (!countries) {
        return null;
    }

    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    } else {
        return <>
            {countries.map(name => <p key={name}>{name}</p>)}
        </>
    }
}

const SingleSearchResultDisplay = ({countryData}) => {
    if (!countryData) {
        return null
    }
    return <>
        <h1>{countryData.name.common}</h1>
        <p>Capital {countryData.capital}</p>
        <p>Area {countryData.area}</p>
        <h1>Languages</h1>
        <ul>
            {Object.values(countryData.languages).map(l => <li key={l}>{l}</li>)}
        </ul>
        <img src={countryData.flags.png} alt=""/>
    </>
}

function App() {
    const [countryNameDB, setCountryNameDB] = useState([])
    const [countries, setCountries] = useState([])
    const [input, setInput] = useState("")
    const [singleCountryData, setSingleCountryData] = useState(null)

    useEffect(() => {
        axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then(
            (response) => {
                setCountryNameDB(response.data.map(c => c.name.common))
            }
        )
    }, [])

    const handleUserInput = (e) => {
        const userInput = e.target.value
        setInput(userInput)
        if (!userInput.trim()) {
            setCountries([])
        } else {
            const queryResult = countryNameDB.filter(name => name.toLowerCase().includes(userInput.trim().toLowerCase()))
            setCountries(queryResult)
            if (queryResult.length === 1) {
                axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${queryResult[0]}`).then(
                    response => setSingleCountryData(response.data)
                )
            }
        }
    }

    return (<>
        <p>find countries <input value={input} onChange={handleUserInput}/></p>
        {countries.length === 1 ?
            <SingleSearchResultDisplay countryData={singleCountryData}></SingleSearchResultDisplay> :
            <MultipleSearchResultDisplay countries={countries}></MultipleSearchResultDisplay>
        }
    </>)
}

export default App
