export default async function getItems(param: string) {
  const query = encodeURIComponent(param)
  const url =
    param === ''
      ? 'https://dummyjson.com/products'
      : `https://dummyjson.com/products/search?q=${query}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to load data. Error code: ${response.status}`)
  }
  const jsonObj = await response.json()
  return jsonObj.products
}
