import {useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useAppStateContext } from '../utilis/AppStateProvider'
import { client } from '../sanity/client'
import {v4 as uuidv4} from "uuid"
import { useRouter } from 'next/router'



const BuyNowBtn = ({book}) => {
    const [loading, setLoading] = useState(false)
    const {cartLength, setCartLength} = useAppStateContext()
    const {data: session} = useSession()
    const router = useRouter()

    const handleBuyNow = async () => {
        if (session) {
            setLoading(true)
            const doc = book
            doc._key = uuidv4()
            client.patch(session.user.id).setIfMissing({cart: []})
            .insert("after", "cart[-1]", [doc]).commit().then(() => {
                setCartLength(prevState => prevState + 1)
                router.push("/account/cart")
            }).catch(err => {
                console.log(err)
            })
        } else {
            router.push("/")
        }
    }
  return (
    <button className="px-2 text-sm bg-amber-400 shadow-md border border-amber-300 text-slate-900  "
        type="button" 
        onClick={() => handleBuyNow()}
    >
        Buy Now
    </button>
  )
}

export default BuyNowBtn