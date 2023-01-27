import {useState, useEffect} from 'react'
import { client } from '../sanity/client'
import Bookcard from './Bookcard'
import EmptyRows from './EmptyRows'

const BooksRowLayout = ({books, sortOption, category, searchTerm}) => {
    const [bookList, setBookList] = useState(null)
    useEffect(() => {
        if (books) {
            setBookList(books)
        }
    }, [books])
   
  return (
    <div className="my-2 mx-8">
       {bookList ? bookList.map((book, i) => {
        return (
            <Bookcard key={i} book={book}/>
        )})
        :
        <EmptyRows iteration={5} />
        }
    </div>
  )
}

export default BooksRowLayout