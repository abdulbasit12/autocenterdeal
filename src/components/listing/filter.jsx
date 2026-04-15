import React, { useContext, useState } from 'react'
import { ContextAPI } from '../shared/contextAPI'

function Filter() {

    const { state, updateState } = useContext(ContextAPI)
    const { data, filteredData } = state

    const updateContext = (key, val) => {
        updateState(prev => ({ ...prev, [key]: val }))
    }

    return (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">Search Cars</label>
                    <div className="relative">
                        <input type="text" id="search" placeholder="Search by car name..." onChange={(e) => { updateContext('searchTerm', e.target.value) }} className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:border-transparent" />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="md:w-64">
                    <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                    <select id="sort" onChange={(e) => { updateContext('sortBy', e.target.value) }} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" >
                        <option value="name">Name (A-Z)</option>
                        <option value="price-low">Price (Low to High)</option>
                        <option value="price-high">Price (High to Low)</option>
                    </select>
                </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">Showing {filteredData?.length} of {data?.length} cars</div>
        </div>
    )
}

export default Filter