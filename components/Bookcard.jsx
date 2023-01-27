import {useState} from 'react'
import { client, urlFor } from '../sanity/client'
import { useSession } from 'next-auth/react'
import {v4 as uuidv4} from "uuid"
import {AiFillStar} from "react-icons/ai"
import Link from 'next/link'
import { getCategoryIndex } from '../utilis/categories'
import AddToCartBtn from './AddToCartBtn'

const Bookcard = ({book}) => {
    const {data: session} = useSession()
    const categoryIndex = getCategoryIndex(book.category)

  return (
    <div className="flex  border border-slate-100 m-1 min-w-[400px] max-w-[1200px] mb-2 bg-white">
        <div className="px-8 py-2 bg-slate-50">
            <Link href={`/books/${categoryIndex}/${book._id}`}>
                <img src={urlFor(book.image).width(150)} alt="book" />
            </Link>
        </div>
        <div className="flex flex-col justify-between w-full my-2 mx-3">
            <div className="flex flex-col gap-1 h-full">
                <p className="font-semibold text-lg"><Link href={`/books/${categoryIndex}/${book._id}`}>{book.name}</Link></p>
                <p>by <span className="font-semibold">{book.author}</span> </p>
                <div className="h-full flex flex-col justify-between">

                    <div className="flex gap-1 items-center">
                        <AiFillStar  className="text-amber-600 w-5 h-5" />
                        <p className="font-semibold">{book.raiting} / 5</p>
                    </div>
                    <Link href={`/books/${getCategoryIndex(book.category)}`} className="mb-2 text-sm font-semibold hover:text-slate-600 self-start">{book.category}</Link>
                </div>
                
            </div>
            <div className="flex justify-between items-center border-t pt-2">
                <div className="">
                    <p className="text-lg font-semibold">${parseInt(book.price).toFixed(2)}</p>
                </div>
                <AddToCartBtn book={book} />
            </div>
        </div>
    </div>
  )
}

export default Bookcard