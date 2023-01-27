import {useState, useEffect} from 'react'

const Pagination = ({fetchMoreBooks, totalCount, booksPerPage, fetching}) => {
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(0)
    const currentPageNumberCss = "px-4 py-2 border border-black hover:bg-gray-200"
    const lastPageCss = "px-4 py-2 border border-black hover:bg-gray-200"
    const pageNumberCss = "px-4 py-2 hover:bg-gray-200"
    useEffect(() => {
      let lastPage = totalCount / booksPerPage
      lastPage = Math.ceil(lastPage)
      console.log("total count:", totalCount, "books per page:", booksPerPage, " = ", totalCount / booksPerPage , "last page:",lastPage)
      setLastPage(lastPage)

    }, [totalCount, fetching])
    useEffect(() => {
      setPage(1)
    }, [fetching])
    const nextPage= (pageX) => {
        if (pageX === page || pageX > lastPage) {
          return
        }
        let start = (pageX  * booksPerPage) - booksPerPage
        let end = pageX * booksPerPage
        setPage(pageX)
        fetchMoreBooks(start, end)
        window.scrollTo("top", 0)
    }
    if (lastPage <= 1) {
      return
    }
  return (
    <div className="flex w-full justify-center max-w-[1200px] my-8">
    <div className="flex ">
      <div className="flex gap-1 border">
        {
          lastPage <= 4 ? <>
             <button onClick={() => nextPage(1)} className={`${page === 1 ? currentPageNumberCss : pageNumberCss}`} type="button">
            1
            </button>
           { lastPage >= 2 && <button onClick={() => nextPage(2)} className={`${page === 2 ? currentPageNumberCss : pageNumberCss}`} type="button">
            2
            </button>}
           {lastPage >= 3 && <button onClick={() => nextPage(3)} className={`${page === 3 ? currentPageNumberCss : pageNumberCss}`} type="button">
            3
            </button>}
           {lastPage === 4 && <button onClick={() => nextPage(4)} className={`${page === 3 ? currentPageNumberCss : pageNumberCss}`} type="button">
            4
            </button>}
          </>
        
        
        : page < 4 ?
        <>
            <button onClick={() => nextPage(1)} className={`${page === 1 ? currentPageNumberCss : pageNumberCss}`} type="button">
            1
            </button>
            <button onClick={() => nextPage(2)} className={`${page === 2 ? currentPageNumberCss : pageNumberCss}`} type="button">
            2
            </button>
            {lastPage !== 2 && <> <button onClick={() => nextPage(3)} className={`${page === 3 ? currentPageNumberCss : pageNumberCss}`} type="button">
            3
            </button></>}
            <p className="py-2 px-2">
              ...
            </p>
            <button onClick={() => nextPage(lastPage)} className={`${page === lastPage ? lastPageCss : pageNumberCss}`}>
              {lastPage}
            </button>
            <button onClick={() => nextPage(page + 1)} type="button" className="px-4 py-2 hover:bg-gray-200">
              Next
            </button>

        </> : page >= lastPage - 1 ? 
        <>
            <button onClick={() => nextPage(1)} className="px-4 py-2 hover:bg-gray-200" type="button">
              1
            </button>
            <p className="py-2 px-2">...</p>
            { page === lastPage && <button onClick={() => nextPage(page -2)} className="px-4 py-2 hover:bg-gray-200" type="button">
            {page - 2}
            </button>}
            <button onClick={() => nextPage(page -1)} className="px-4 py-2 hover:bg-gray-200" type="button">
            {page - 1}
            </button>
            <button onClick={() => nextPage(page)} className={`${page === page ? lastPageCss : pageNumberCss}`} type="button">
            {page}
            </button>
          { page !== lastPage && <> <button onClick={() => nextPage(lastPage)} className={`${page === lastPage ? lastPageCss : pageNumberCss}`} type="button">
            {lastPage}
            </button>
            <button onClick={() => nextPage(page + 1)} type="button" className="px-4 py-2 hover:bg-gray-200">
              Next
            </button></>}
            

        </> :
        <>
            <button onClick={() => nextPage(1)} className="px-4 py-2 hover:bg-gray-200" type="button">
              1
            </button>
            <p className="py-2 px-2">...</p>
            <button onClick={() => nextPage(page - 1)} className="px-4 py-2 hover:bg-gray-200" type="button">
            {page - 1}
            </button>
            <button onClick={() => nextPage(page)} className="px-4 py-2 hover:bg-gray-200 border border-black" type="button">
            {page}
            </button>
            <button onClick={() => nextPage(page + 1)} className="px-4 py-2 hover:bg-gray-200" type="button">
            {page + 1}
            </button>
            <p className="py-2 px-2">
              ...
            </p>
            <button onClick={() => nextPage(lastPage)} className={`${page === lastPage ? lastPageCss : pageNumberCss}`}>
              {lastPage}
            </button>
            <button onClick={() => nextPage(page + 1)} type="button" className="px-4 py-2 hover:bg-gray-200">
              Next
            </button>
        </>
        }
      </div>
    </div>
  </div>
  )
}

export default Pagination