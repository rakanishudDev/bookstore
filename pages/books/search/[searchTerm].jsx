import {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import { client} from '../../../sanity/client'
import BooksLayout from '../../../components/BooksLayout'

const Search = () => {
    const [books, setBooks] = useState(null)
    const [totalCount, setTotalCount] = useState(0)
    const router = useRouter()
    const searchTerm = router.query.searchTerm
    useEffect(() => {
        if (searchTerm ){
            client.fetch(`{
                "books": *[_type == "books" && name match '${searchTerm}' || author match '${searchTerm}' || category match '${searchTerm}'] | order(createdAt desc) [0...10],
                "totalCount": count(*[_type == "books" && name match '${searchTerm}' || author match '${searchTerm}' || category match '${searchTerm}'])
            }`).then((data) => {
                data.books.map(book => {
                    book.price = book.price.toFixed(2)
                })
                console.log(data)
                setBooks(data.books)
                setTotalCount(data.totalCount)
            })
        }
    }, [searchTerm])
  return (
    <div className="flex flex-col justify-center w-full layoutCss">
        {/* <BooksLayout books={books} searchTerm={searchTerm} totalCount={totalCount} pagination={true} />  */}
        <BooksLayout pagination={true} bookList={books} searchTerm={searchTerm} totalCount={totalCount} /> 
     
    </div>
  )
}

export default Search