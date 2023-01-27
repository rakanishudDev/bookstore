import categories from '../utilis/categories'
import Link from 'next/link'
import { getCategoryIndex } from '../utilis/categories'

const Sidebar = () => {
  return (
    <div className="sidebar border-r  p-4 min-w-max ">

        <ul className="mb-4">
            <div className="mb-2">
                <p className="text-lg font-semibold">Categories</p>
            </div>
        {
            categories?.map((category, i) => {
                return (
                    <li key={i} className="mb-1 ml-2 text-sm  hover:text-amber-600">
                        <Link href={`/books/${getCategoryIndex(category)}`}>{category}</Link>
                    </li>
                )
            })
        }
        </ul>
    </div>
  )
}

export default Sidebar