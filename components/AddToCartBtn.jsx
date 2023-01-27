import {useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useAppStateContext } from '../utilis/AppStateProvider'
import { client } from '../sanity/client'
import {v4 as uuidv4} from "uuid"
import { useRouter } from 'next/router'

const AddToCartBtn = ({book}) => {
  const [loading, setLoading] = useState(false)
  const {cartLength, setCartLength} = useAppStateContext()
  const {data: session} = useSession()
  const router = useRouter()

  const addToCart = () => {
    if (session) {
      setLoading(true)
      const doc = book
      doc._key = uuidv4()
      client.patch(session.user.id).setIfMissing({cart: []})
      .insert("after", "cart[-1]", [doc]).commit().then(() => {
          setCartLength(prevState => prevState + 1)
          setLoading(false)
      }).catch(err => {
          console.log(err)
          setLoading(false)
      })
    } else {
      router.push("/")
    }
  }
  
  return (
    <button className="px-2 text-sm bg-amber-200 text-black shadow-md border border-amber-300 text-slate-900 "
        type="button" 
        onClick={() => addToCart()}
    >
      {loading ? "Loading..." : "Add to Cart"}
    </button>
  )
}

export default AddToCartBtn