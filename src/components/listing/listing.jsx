import React, { useContext } from 'react'
import { ContextAPI } from '../shared/contextAPI'

function Listing() {

    const { state } = useContext(ContextAPI)
    const { filteredData } = state

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData?.map((product) => {
                return (
                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="aspect-w-16 aspect-h-12 bg-gray-200">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-48 object-cover"
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
    )
}

export default Listing