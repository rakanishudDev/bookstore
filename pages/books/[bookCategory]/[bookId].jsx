import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { client, urlFor } from '../../../sanity/client'
import {AiFillStar} from "react-icons/ai"
import AddToCartBtn from '../../../components/AddToCartBtn'
import Loading from "../../../components/Loading"
import { useAppStateContext } from '../../../utilis/AppStateProvider'
import Review from '../../../components/Review'
import Recommended from '../../../components/Recommended'
import BuyNowBtn from '../../../components/BuyNowBtn'
const BookPage = () => {
    const [book, setBook] = useState(null)
    const router = useRouter()
    const bookId = router.query.bookId
    const [loading, setLoading] = useState(false)
    const {setCartLength} = useAppStateContext()
    useEffect(() => {
        setLoading(true)
        if (bookId) {
            client.fetch(`*[_type == "books" && _id == "${bookId}"]`).then(data => {
                setBook(data[0])
                setLoading(false)
            }).catch(err => {
                console.log(err)
                setLoading(false)
            })
        }
    }, [bookId])
    
    
    if (loading) {
        return <div className="mt-32"><Loading /></div>
    } 
    if (book) return (
    <div className="my-6 flex flex-col w-full mr-6">
        
        <div className="flex flex-col ">
            <div className="flex gap-6 mx-10 bookpage"> 
                <div>
                    <div className='border-4 flex justify-center sm:'>
                        <img className="p-3" style={{minWidth: "250px"}} src={urlFor(book.image).width(250)} width="250"/>
                    </div>
                </div>
                <div>
                    <div className="border-b-4 py-4">
                        <h1 className="text-2xl font-semibold">{book.name}</h1>
                        <p>by <span className="font-semibold">{book.author}</span></p>
                        <div className="flex gap-1 items-center">
                            <AiFillStar  className="text-amber-600 w-5 h-5" />
                            <p className="font-semibold">{book.raiting} / 5</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-5 border-b-4 py-4">
                            <div className="flex flex-col border-2 border-amber-400 px-2 ">
                                <p className="text-lg">Handcover</p>
                                <p className="text-lg font-semibold">${book.price}</p>
                            </div>
                            <div className="flex flex-col border-2 border-amber-500 px-2 ">
                                <p className="text-lg">Audiobook</p>
                                <p className="text-lg font-semibold">${Math.floor(book.price / 2)}.00</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <AddToCartBtn book={book} />
                            <BuyNowBtn book={book} /> 
                        </div>
                    </div>
                    <div className="py-4 border-b-4">
                        <p>{book.description}</p>
                    </div>
                    <div className="flex justify-center gap-6 py-4">
                        <div className="border-2 p-1 px-2">
                            <p ><span className="font-semibold">Pages:</span> {book.pages}</p>
                        </div>
                        <div className="border-2 p-1 px-2">
                            <p><span className="font-semibold">Language:</span> {book.language}</p>
                        </div>
                        <div className="border-2 p-1 px-2">
                            <p><span className="font-semibold">Publication date:</span> {book.year}</p>
                        </div>
                        <div className="border-2 p-1 px-2">
                            <p><span className="font-semibold">Caetgory:</span> {book.category}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex flex-col gap-6 items-center mt-12 ">
                    {book.reviews ? <div className="flex flex-col   pl-6 reviews mr-6">
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Reviwes</h2>
                        </div>
                        {book.reviews?.map((review, i)=> {
                            if (review.length > 900) {
                                return < Review key={i} review={review} longReview={true} />
                            }
                            return < Review key={i} review={review} longReview={false} />
                        })}
                    </div> :
                    <p>
                    No customer reviews</p>}
                </div>
            </div>
        </div>
        <div className="mt-12 flex justify-center">
            <Recommended />
        </div>

    </div>
  )
}

export default BookPage