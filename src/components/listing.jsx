import React, { useState, useEffect } from 'react'
import { getItems } from '../functions/API'
import Loading from './shared/loading'
import { useDebounce } from './shared/useDebounce'

function Listing() {

  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [loading, setLoading] = useState(true)
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    (async () => {
      try {
        let response = await getItems()
        setProducts(response)
      } catch (error) {
        alert('Something went wrong!')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const filteredData = useDebounce(() => {
    let filtered = products.filter(product =>
      product.title?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    )

    const data = filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title)
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        default:
          return 0
      }
    })
    setFilteredProducts(data || [])
  }, 300)

  useEffect(() => {
    filteredData()
  }, [products, searchTerm, sortBy])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Car Listings</h1>
        <p className="text-gray-600">Find your perfect car from our collection</p>
      </div>

      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">Search Cars</label>
            <div className="relative">
              <input type="text" id="search" placeholder="Search by car name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:border-transparent" />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="md:w-64">
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" >
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
            </select>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-600">Showing {filteredProducts.length} of {products.length} cars</div>
      </div>

      {!loading ?
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts?.map((product) => {
            return (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-12 bg-gray-200">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300/e5e7eb/6b7280?text=Car+Image' }}
                  />
                </div>
                <div className="p-4 flex flex-col items-center">
                  <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
                  <span className="text-2xl font-bold text-blue-600">${product.price.toLocaleString()}</span>
                </div>
              </div>
            )
          })}
        </div>
        :
        <div className='flex w-full justify-center'><Loading /></div>
      }

      {(!loading && filteredProducts.length === 0) && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No data found</h3>
        </div>
      )}
    </div>
  )
}

export default Listing