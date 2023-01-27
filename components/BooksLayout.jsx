import {useState, useEffect} from 'react'
import {MdGridView, MdTableRows} from "react-icons/md"
import BooksRowLayout from './BooksRowLayout'
import BooksGridLayout from './BooksGridLayout'
import { client } from '../sanity/client'
import { useRouter } from 'next/router'
import Pagination from './Pagination'
import { getCategory } from '../utilis/categories'
import Recommended from './Recommended'
//  category, books, searchTerm, totalCount,
const BooksLayout = ({pagination, bookList, category, searchTerm, totalCount}) => {
    const [books, setBooks] = useState(null)
    const [secondView, setSecondView] = useState(false)
    const [pageName, setPageName] = useState("")
    const [fetching, setFetching] = useState(false)
    const [booksPerPage, setBooksPerPage] = useState(10)
    const [sortOption, setSortOption] = useState("createdAt desc")

    useEffect(() => {
        setBooks(bookList)
    }, [bookList])

    const changeBooksLayout =(gridView) => {
        setFetching(prevState => !prevState)
        setSecondView(gridView)
        if (gridView) {
            setBooksPerPage(15)
            fetchMoreBooks(0, 15)
        } else {
            setBooksPerPage(10)
            fetchMoreBooks(0, 10)
        }

    }

    const sortBy = (option) => {
        let index = parseInt(option)
        const options = ["createdAt desc", "price asc", "price desc", "year desc", "raiting desc"]
        let query = ``
        if (searchTerm) {
            query = `{
                "books": *[_type == "books" && name match '${searchTerm}' || author match '${searchTerm}' || category match '${searchTerm}'] | order(${options[index]}) [0...${booksPerPage}],
                "totalCount": count(*[_type == "books" && name match '${searchTerm}' || author match '${searchTerm}' || category match '${searchTerm}'] | order(${options[index]}) [0...${booksPerPage}])
            }`
        }
        else if (category) {
            query = `{
                "books": *[_type == "books" && category match "${category}"] | order(${options[index]}) [0...${booksPerPage}],
                "totalCount": count(*[_type == "books" && category match "${category}"] | order(${options[index]}) [0...${booksPerPage}])
                }`
        } else {
            query = `{
                "books": *[_type == "books"] | order(${options[index]}) [0...${booksPerPage}],
                "totalCount": count(*[_type == "books"] | order(${options[index]}) [0...${booksPerPage}])
            }`
        }
        setSortOption(options[index])
        client.fetch(query).then(data => {
            setBooks(data.books)
            setFetching(prevState => !prevState)
        }).catch(err => console.log(err))
    }


    const fetchMoreBooks = (start, end) => {
        let query = ""
        if (category) {
          query = `{
            "books": *[_type == "books" && category match "${category}"] | order(${sortOption}) [${start}...${end}]
        }`
        }
        else if (searchTerm) {
          query = `{
            "books": *[_type == "books" && name match '${searchTerm}' || author match '${searchTerm}' || category match '${searchTerm}'] | order(${sortOption}) [${start}...${end}]
        }`
        } else {
          query = `{"books": *[_type == "books"] | order(${sortOption}) [${start}...${end}] }`
        }
        
        client.fetch(query).then(data => {
          data.books.map(book => {
            book.price = book.price.toFixed(2)
          })
          setBooks(data.books)
        })
      }


  return (<>
    <div className="px-6 w-full">
        <div className="flex items-center justify-between w-full h-[48px] mt-8 mb-2 gap-2  border-t-4 py-2 px-6">
            {!category && !searchTerm && <h2 className="">Total of {totalCount} results</h2>}
            {category && <div className="flex gap-3 items-center">
                            <p>/ {category} / Total of {totalCount} results</p>
                            {/* <div className=" ">/</div> */}
                            {/* <p className="text-md">Total of {totalCount} results</p> */}
                        </div>
            }
            {searchTerm && <p className="text-md"> Total of {totalCount} results for <span className="text-lg"> "{searchTerm}"</span></p>}
            <div className="flex justify-between items-center gap-2">
                <div>
                    <select className="border border-black mr-1 outline-none" onChange={(e) => sortBy(e.target.value)}>
                        <option value="0">Featured</option>
                        <option value="1">Price: Low to High</option>
                        <option value="2">Price: High to Low</option>
                        <option value="3">Publication Date</option>
                        <option value="4">Rating</option>
                    </select>
                </div>
                <button onClick={() => changeBooksLayout(false)} type="button"><MdTableRows className="w-6 h-6 text-slate-900"/></button>
                <button onClick={() => changeBooksLayout(true)} type="button"><MdGridView className="w-6 h-6 text-slate-900"/></button>
            </div>
        </div>
        </div>
        <div className="my-2 mx-8">
            { books && secondView ? 
                <BooksGridLayout books={books} totalCount={totalCount} booksPerPage={booksPerPage} pagination={pagination} sortOption={sortOption} category={category} searchTerm={searchTerm}/> 
                : 
                <BooksRowLayout books={books} totalCount={totalCount} booksPerPage={booksPerPage} pagination={pagination} sortOption={sortOption} category={category} searchTerm={searchTerm}/>
            }
            <div className="mx-8">
                <Pagination fetchMoreBooks={fetchMoreBooks} totalCount={totalCount} booksPerPage={booksPerPage} fetching={fetching} />
            </div>
        </div>
        <div className="mt-6 mb-12">
            <Recommended />
        </div>
    </>)
}

export default BooksLayout