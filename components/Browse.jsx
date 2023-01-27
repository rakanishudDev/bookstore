import {useState} from 'react'
import {MdGridView, MdTableRows} from "react-icons/md"
import BooksRowLayout from './BooksRowLayout'
import Link from 'next/link'

const Browse = ({books, totalCount}) => {
  return (<>
    <div className=" border-t-4 mx-4 mt-4 px-6 ">
            <div className="py-2 ">
                <div className="flex gap-2 items-center">
                    <h2 className="text-xl font-semibold ">Browse</h2>
                    <Link href="/books" className="text-sm text-sky-400 cursor-pointer">See more</Link>
                </div>
            </div>
        </div>
    <div className="my-2 mx-8 ">
        {books && <BooksRowLayout books={books} totalCount={totalCount} pagination={false} />}
        <div className="flex justify-center my-8 min-w-[400px] max-w-[1200px] mx-9">
            <Link href="/books" className=" border-y w-full flex justify-center p-2 px-6 bg-gray-50">
                <h2 className="text-sm font-semibold ">See All Results</h2>
            </Link>
        </div>
    </div>
    </>)
}

export default Browse