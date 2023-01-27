import {useState} from 'react'
import categories from '../../utilis/categories'
import Link from 'next/link'
import { getCategoryIndex } from '../../utilis/categories'

const SidebarV2 = () => {
   
    
  return (
    <div className="sidebarV2 absolute right-0 top-13 border-r border-slate-200 p-4 bg-slate-100 w-full shadow-md">
            
        <ul className="mb-4">
            {/* <div className="mb-2">
                <p className="text-lg font-semibold">Categories</p>
            </div> */}
            <div className=" flex gap-4 flex-wrap justify-center">
            { categories?.map((category, i) => {
                    return (
                        <li key={i} className="mb-1 ml-2 text-sm font-semibold hover:text-slate-600">
                            <Link href={`/books/${getCategoryIndex(category)}`}>{category}</Link>
                        </li>
                    )
                }) }
            </div>
        </ul>
    </div>
  )
}

export default SidebarV2