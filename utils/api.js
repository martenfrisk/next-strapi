const API_URL = process.env.API_URL || 'http://localhost:1337/graphl'

async function fetchAPI(query, { variables, preview } = {}) {
  const res = await fetch(API_URL + (preview ? '/preview' : ''), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    // eslint-disable-next-line no-console
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}


export async function getAllProductsForHome() {
  const data = await fetchAPI(
    `
    query {
      products {
        name
        price
      }
    }
  `,
  )
  const plainData = {
    ...data
  }
  return data
}
