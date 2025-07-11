export default async function getItems(param: string) {
  const query = encodeURIComponent(param)
  const url =
    param === ''
      ? 'https://dummyjson.com/products'
      : `https://dummyjson.com/products/search?q=${query}`
  const response = await fetch(url)
  const jsonObj = await response.json()
  return jsonObj.products
}
