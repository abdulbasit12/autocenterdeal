import React, { useState, useEffect, useContext } from 'react'
import { getItems } from '../../functions/API'
import Loading from '../shared/loading'
import { useDebounce } from '../shared/useDebounce'
import { ContextAPI } from '../shared/contextAPI'
import Filter from './filter'
import Listing from './listing'

function Layout() {

    const [loading, setLoading] = useState(true)

    const { state, updateState } = useContext(ContextAPI)
    const { searchTerm = '', sortBy = 'name', data, filteredData } = state

    useEffect(() => {
        (async () => {
            try {
                let response = await getItems()
                updateState({ data: response || [] })
            } catch (error) {
                alert('Something went wrong!')
            } finally {
                setLoading(false)
            }
        })()
    }, [])
    
    const callbackFn = useDebounce(() => {
        let filtered = data?.filter(product =>
            product.title?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        )

        const updatedData = filtered.sort((a, b) => {
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
        updateState(prev => ({...prev, filteredData: updatedData}))
    }, 300)

    useEffect(() => {
        callbackFn()
    }, [data, searchTerm, sortBy])
    
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Car Listings</h1>
                <p className="text-gray-600">Find your perfect car from our collection</p>
            </div>

            <Filter />

            {!loading ?
                <Listing />
                :
                <div className='flex w-full justify-center'><Loading /></div>
            }

            {(!loading && filteredData?.length === 0) && (
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

export default Layout