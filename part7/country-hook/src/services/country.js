const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

const find = async (countryName) => {
  if (!countryName) {
    return null
  }
  const response = await fetch(`${baseUrl}/${countryName}`)
  if (!response.ok) {
    return { found: false, data: null }
  }
  const countryRaw = await response.json()

  return {
    found: true,
    data: {
      name: countryRaw.name.common,
      capital: countryRaw.capital[0],
      population: countryRaw.population,
      flag: countryRaw.flags.png,
    },
  }

}

export default { find }