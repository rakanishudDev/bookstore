import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { client } from '../../../sanity/client'
import { getCategory } from '../../../utilis/categories'
import BooksLayout from '../../../components/BooksLayout'

const BookCategory = () => {
    const [books, setBooks] = useState(null)
    const [totalCount, setTotalCount] = useState(0)
    const router = useRouter()
    const bookCategory = router.query.bookCategory
    const category = getCategory(bookCategory)

    useEffect(() => {
        if (bookCategory) {
            client.fetch(`{
                "books": *[_type == "books" && category match "${category}"] | order(createdAt desc) [0...15],
                "totalCount": count(*[_type == "books" && category match "${category}"])
            }`).then(data => {
                setBooks(data.books)
                setTotalCount(data.totalCount)
                console.log(data)
                console.log(bookCategory)
            })
        }
    }, [bookCategory])
  return (
    <div className="flex flex-col justify-center w-full layoutCss">
        <BooksLayout category={category} bookList={books} pagination={true} totalCount={totalCount} />
    </div>
  )
}

export default BookCategory