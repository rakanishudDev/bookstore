import Head from 'next/head'
import { useEffect, useState } from 'react'
import { client } from '../sanity/client'
import {useSession, signIn} from "next-auth/react"
import BestSellers from '../components/BestSellers'
import TopRated from '../components/TopRated'
import BooksLayout from '../components/BooksLayout'
import Browse from '../components/Browse'
import FrontpageAddBook from '../components/FrontpageAddBook'
export default function Home() {
  const [books, setBooks] = useState(null)
  const [totalCount, setTotalCount] = useState()
  const {data: session} = useSession()
  useEffect(() => {
      client.fetch(`{
        "books": *[_type == "books"] | order(price desc) [0...8],
        "totalCount": count(*[_type == "books"])
      }`).then(data => {
        data.books.map(book => {
          book.price = book.price.toFixed(2)
        })
        setBooks(data.books)
        setTotalCount(data.totalCount)
      }).catch(err => console.log(err))
  }, [])

  // if (!session) { return (
  //     <>
  //       <p>Please Sign In</p>
  //       <br />
  //       <button type="button" onClick={() => signIn()}>Sign in</button>
  //     </>
  //   )}

  return (
    <div className="flex flex-col justify-center w-full layoutCss">
      <div className="flex flex-col items-center mt-10">
        {/* <h1 className="text-2xl font-semibold">Special Offers</h1> */}
        <div className="flex justify-center flex-wrap gap-6">
          {books?.map((book, i) => {
            if (i < 5) {
              return <FrontpageAddBook book={book}/>
            }
          })}
        </div>
      </div>
      <BestSellers />
      <TopRated />
      {totalCount && <Browse books={books} totalCount={totalCount}/>}
        
    </div>
  )
}
