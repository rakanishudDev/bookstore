import Head from 'next/head'
import { useEffect, useState } from 'react'
import { client } from '../../sanity/client'
import {useSession, signIn} from "next-auth/react"
import BooksLayout from '../../components/BooksLayout'

const index = () => {
    const [books, setBooks] = useState(null)
    const [totalCount, setTotalCount] = useState(0)
    const {data: session} = useSession()

    useEffect(() => {
        client.fetch(`{
          "books": *[_type == "books"] [0...10],
          "totalCount": count(*[_type == "books"])
        }`).then(data => {
          data.books.map(book => {
            book.price = book.price.toFixed(2)
          })
          setBooks(data.books)
          setTotalCount(data.totalCount)
          console.log(data)
        }).catch(err => console.log(err))
    }, [])
  
  return (
    <div className="flex flex-col justify-center w-full layoutCss">
        {books && totalCount && <BooksLayout bookList={books} totalCount={totalCount} pagination={true}/>}
    </div>
  )
}

export default index