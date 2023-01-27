import {useEffect, useState} from 'react'
import { client } from '../sanity/client'
import BookcardV2 from './BookcardV2'
import Link from 'next/link'
import EmptyGrid from './EmptyGrid'
const BestSellers = () => {
    const [books, setBooks] = useState(null)
    const booksForLoadingPhase = [1,2,3,4,5,6];
    useEffect(() => {
        client.fetch(`*[_type == "books"] | order(publishedAt desc)[0...7]`).then(data => {
            data.map(book => {
                book.price = book.price.toFixed(2)
              })
            setBooks(data)
            
        }).catch(err => console.log(err))
    }, [])
  return (
    <div className="mb-5">
        <div className=" border-t-4 mx-4 mt-8 mb-2  px-6 ">
            <div className="py-2 ">
                <div className="flex gap-2 items-center">
                    <h2 className="text-xl font-semibold ">Best Sellers</h2>
                    <Link href="/books" className="text-sm text-sky-400 cursor-pointer">See more</Link>
                </div>
            </div>
        </div>
        <div className="flex justify-center mx-8">
            <div className="flex flex-wrap justify-left">
            { books ? books?.length && books.map((book, i) => {
                return <BookcardV2 key={i} book={book} />
            })
            :
            <EmptyGrid iteration={7} />
            }
            </div>
        </div>
    </div>
  )
}

export default BestSellers