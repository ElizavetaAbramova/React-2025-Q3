export default async function getItems(param: string, skip: number) {
  const limit = 10
  const query = encodeURIComponent(param)
  const url =
    param === ''
      ? `https://dummyjson.com/products/search?limit=${limit}&skip=${skip}`
      : `https://dummyjson.com/products/search?q=${query}&limit=${limit}&skip=${skip}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to load data. Error code: ${response.status}`)
  }
  const jsonObj = await response.json()

  return { list: jsonObj.products, total: jsonObj.total, currentPage: jsonObj.skip + 1 }
}
