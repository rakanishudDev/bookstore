import {useState, useEffect} from 'react'
import {AiOutlineDown} from "react-icons/ai"

const Review = ({review, longReview}) => {
    const [readMore, setReadMore] = useState(longReview)

  return (
    <>
    { readMore ? 
        <div>                    
            <div className="max-w-4xl border-b border-gray-200 pb-4 mt-3">
                <div className="flex gap-2 items-center">
                    <img className="m-1 rounded-full" width="35" src="/user1.jpg" />
                    <p className="text-sm font-semibold">Bookstroe customer</p>
                </div>
                <div className="ml-5  max-h-[190px] overflow-hidden review relative" >
                    <div className="absolute bottom-[0px] h-[190px] longReview"></div>
                    <p>{review}</p>
                </div>
                <div className="ml-10 mt-2 flex gap-1 items-center">
                    <AiOutlineDown className="text-blue-900"/>
                    <button type="button" onClick={() => setReadMore(false)} className="font-semibold text-sm text-blue-900">Read more</button>
                </div>
            </div>
        </div>
    :
    <div className="max-w-4xl border-b border-gray-200 pb-4 mt-3">
        <div className="flex gap-2 items-center">
            <img className="m-1 rounded-full" width="35" src="/user1.jpg" />
            <p className="text-sm font-semibold">Bookstroe customer</p>
        </div>
        <div className="ml-5" >
            <p>{review}</p>
        </div>
    </div>
    }
  </>)
}

export default Review