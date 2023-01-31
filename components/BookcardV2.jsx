import React from 'react'
import { urlFor } from '../sanity/client'
import {AiFillStar} from "react-icons/ai"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCategoryIndex } from '../utilis/categories'
import Image from 'next/image'

const BookcardV2 = ({book}) => {
    const [toSlice, setToSlice] = useState(false)
    const [bookName, setBookName] = useState(book.name)
    const categoryIndex = getCategoryIndex(book.category)
    useEffect(() => {
        if (book.name.length > 97) {
            setBookName(book.name.slice(0, 92))
            setToSlice(true)
            if (bookName[91] === " ") {
                setBookName(book.name.slice(0, 91))
            }
        }
    }, [])
    
  return (
    
        <div className=" flex flex-col w-56 h-[282px] px-3 pt-2 h-full border border-slate-100  bg-white ">
            <div className="flex justify-center">
                <Link href={`/books/${categoryIndex}/${book._id}`}>
                    <img src={urlFor(book.image).width(100)} alt="book" />
                </Link>
            </div>
            <div className="flex flex-col items-between h-full ">
                <div className="text-center mt-1 overflow-hidden h-full">
                    <Link href={`/books/${categoryIndex}/${book._id}`}>
                        <p className="text-sm font-semibold ">{bookName}{toSlice && <span className="tracking-wider">...</span>}</p>
                    </Link>
                </div>
                <div className="flex justify-between items-center border-t-2">
                    <div className="flex gap-1 items-center">
                        <AiFillStar  className="text-amber-600 w-5 h-5" />
                        <p className="font-semibold">{book.raiting} / 5</p>
                    </div>
                    <p className="text-lg font-semibold">${book.price}</p>
                </div>
            </div>
        </div>
   
  )
}

export default BookcardV2