import {useState, useEffect} from 'react'
import EmptyGrid from './EmptyGrid'
import Link from 'next/link'
import { client } from '../sanity/client'
import BookcardV2 from './BookcardV2'

const Recommended = () => {
    const [books, setBooks] = useState(null)
    useEffect(() => {
        client.fetch(`*[_type == "books"] | order(raiting desc)[0...14]`).then(data => setBooks(data)).catch(err => console.log(err))
    }, [])
  return (
    <div className="mb-5">
        <div className=" border-t-4 mx-4 mt-4 mb-2 px-6 ">
            <div className="py-2 ">
                <div className="flex gap-2 items-center">
                    <h2 className="text-xl font-semibold ">Recommended to you</h2>
                    <Link href="/books" className="text-sm text-sky-400 cursor-pointer">See more</Link>
                </div>
            </div>
        </div>
        <div className="flex justify-center mx-8">
            <div className="flex flex-wrap justify-left gap-y-4">
                {books ? books?.length && books.map((book, i) => {
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

export default Recommended