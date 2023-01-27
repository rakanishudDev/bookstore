import BookcardV2 from "./BookcardV2"
import {useState, useEffect} from 'react'
import { client } from '../sanity/client'
import EmptyGrid from "./EmptyGrid"

const BooksGridLayout = ({books, sortOption, category, searchTerm}) => {
    const [bookList, setBookList] = useState(null)
   
  return (
    <div className="my-2 mx-8">
        <div className="flex justify-center w-full">
            <div className="grid bookcard gap-y-4 w-full justify-left">
            {books ? books.map((book, i) => {
                return (
                    <BookcardV2 key={i} book={book}/>
                )
            }) 
            :
            <EmptyGrid iteration={15} />
            }
            </div>
        </div>
        
    </div>
  )
}

export default BooksGridLayout