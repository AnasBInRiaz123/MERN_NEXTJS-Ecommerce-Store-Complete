import React from 'react'

const CartCard = ({ imageUrl, name, price, quantity }) => {
    return (
        <div className='border-gray-200 bg-gray-100 flex border-2 p-2 mt-1 mb-3 relative'>
            <img src={imageUrl} alt="" />
            <div className='pl-5'>
                <p className='text-lg m-0'> {name}</p>
                <p className='text-am m-0'>{price} </p>
                <p className='text-am '>{quantity}</p>
            </div>
        </div>
    )
}

export default CartCard