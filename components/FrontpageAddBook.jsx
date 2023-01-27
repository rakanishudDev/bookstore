import React from 'react'
import { urlFor } from '../sanity/client'
import BuyNowBtn from './BuyNowBtn'
const FrontpageAddBook = ({book}) => {
    
  return (
    <div className="bg-white mx-6 mt-6 pb-4 mb-2 border-b bg-white">
        <div>
            <img className="" src={urlFor(book.image).width(200).height(250)} />
        </div>
        <div className="max-w-[200px] text-center">
            <div className="flex gap-4 justify-center items-center mx-2 my-2 ">
                <p className=" text-lg font-bold "><span className="text-green-800">$</span>{book.price}</p>
                <div>
                    <BuyNowBtn book={book} />
                </div>
            </div>
            <p className="text-sm font-semibold">{book.name}</p>
        </div>
    </div>
  )
}

export default FrontpageAddBook