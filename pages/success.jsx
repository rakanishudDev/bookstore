import {useEffect, useState} from 'react'
import Link from 'next/link'
import { client } from '../sanity/client'
import { useAppStateContext } from '../utilis/AppStateProvider'
import { useSession } from 'next-auth/react'
import Loading from '../components/Loading'
import { useRouter } from 'next/router'
import {IoBagCheckSharp} from "react-icons/io5"

const Success = () => {
    const {setCartLength, carthLength, buyingMethod, setBuyingMethod} = useAppStateContext()
    const {data: session} = useSession()
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const queryStripe = router.query.stripe
    
    useEffect(() => { 
        setLoading(true)
        if (session) {
            if (queryStripe) {
                const booksToRemove = ["cart"]
                client.patch(session.user.id).unset(booksToRemove).commit()
                .then(() => setCartLength(0))
                .catch(err => console.log(err))
            }
            setLoading(false)
        }
    }, [session, queryStripe])

    if (loading) {
        return <div className="mt-32"><Loading /></div>
    }
  return (
    <div className="m-10 flex justify-center">
        {session && queryStripe ? 
        <div className="flex flex-col items-center p-8 border-4">
                <IoBagCheckSharp className="w-16 h-16" />

                <h1 className="text-xl font-semibold mb-7">Thank You For Your Order</h1>
                <p className="font-semibold">Check your email inbox for the receipt</p>

                
                    <p className="text-center text-sm">
                        If you have any questions, please email at
                        <a href="mailto:bookstore@something.com" className="text-blue-400"> something@example.com</a>
                    </p>
                
            <Link href="/"><button className="px-4 py-2 border bg-amber-300 text-slate-900 mt-8 font-semibold" type="button">CONTINUE SHOPPING</button></Link>
        </div> 
        : 
        <div><Link href="/"><button className="px-4 py-2 border border-amber-400 shadow-md bg-amber-300 text-slate-900 " type="button">CONTINUE SHOPPING</button></Link></div>
        }
    </div>
  )
}

export default Success