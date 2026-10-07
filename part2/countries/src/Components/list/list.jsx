 import { useEffect, useState } from 'react'
 import axios from 'axios'
 const CountryList = (props) => {
    const filterCountries = props.countries.filter((country) =>
        country.name.common
            .toLowerCase()
            .includes(props.filter.trim().toLowerCase())
    )

    const displayCountries = (filterCountries) => {
        if (filterCountries.length > 10) {
            return <p>Too many matches, specify another filter</p>
        } else if (filterCountries.length >= 1) {
            return filterCountries.map((country) => (
                <div key={country.cca3}>
                    <p>{country.name.common}</p>
                    <button onClick={() => props.handleClick(country)}>
                        show
                    </button>
                </div>
            ))
        } else {
            return <p>No country found</p>
        }
    }

    return (
        <div>
            {displayCountries(filterCountries)}
        </div>
    )
}

export default CountryList