import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [countries, setCountry] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('');

  const [states,setState] = useState([]);
  const [selectedState, setSelectedState] = useState('');

  const [cities,setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');  

  useEffect(() => {
    fetch('https://crio-location-selector.onrender.com/countries')
      .then(async (res) => {
        let resp = await res.json();
        setCountry(resp)
      }
      ).catch((err) => console.error(err))
  }, [])

  const handleSelectCountry = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState('');
    setSelectedCity('');
    fetch(`https://crio-location-selector.onrender.com/country=${e.target.value}/states`)
    .then(async (res) => {
      let resp = await res.json();
      setState(resp)
    }
    ).catch((err) => console.error(err))
  }

  const handleSelectState = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity('');
    fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${e.target.value}/cities`)
    .then(async (res) => {
      let resp = await res.json();
      setCity(resp)
    }
    ).catch((err) => console.error(err))
  }

  const handleSelectCity = (e) => {
    setSelectedCity(e.target.value);
  }

  return (
    <>
      <div>
        <h1>Select Location</h1>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',gap:'10px'}}>
        <select  onChange={handleSelectCountry}>
            <option value="" disabled selected>Select Country</option>
                {countries.map((country) => (
                       <option value={country} key={country}>{country}</option>
                       
                ))}
             
            </select>
          <select  onChange={handleSelectState} disabled={selectedCountry === ''}>
          <option value="" disabled selected> Select State</option>
                {states.map((state,index) => (
                       <option value={state} key={index}>{state}</option>
                       
                ))}
             
            </select>

            <select  onChange={handleSelectCity} disabled={selectedCountry === '' || selectedState === ''}>
            <option value="" disabled selected>Select City</option>
                {cities.map((city,index) => (
                       <option value={city} key={index}>{city}</option>
                       
                ))}
             
            </select>
        </div>
      {selectedCountry && selectedCity && selectedState &&   <span style={{fontSize:'20px'}}>You selected {selectedCountry}, {selectedState}, {selectedCity}</span>}
      </div>
    </>
  )
}

export default App
