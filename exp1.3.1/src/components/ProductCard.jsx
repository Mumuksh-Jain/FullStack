import React from 'react'

function ProductCard(props) {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white w-fit hover:shadow-2xl transition-shadow duration-300">
      <img 
        src={props.image} 
        alt={props.name}
        className="w-60 h-48  bg-black "
      />
      <div className="p-4">
        <h3 className="text-xl font-bold">{props.name}</h3>
        <p className="text-gray-700">₹{props.price}</p>
      </div>
    </div>
  )
}

export default ProductCard