
import { useEffect, useState } from 'react'
import { client, urlFor } from '../../sanity/client'
import { useSession, signIn } from 'next-auth/react'
import { getCategoryIndex } from '../../utilis/categories'
import { useAppStateContext } from '../../utilis/AppStateProvider'
import { useRouter } from 'next/router'
import Link from 'next/link'
import getStripe from '../../libs/getStripe'
import Loading from '../../components/Loading'

const Cart = () => {
    const {data: session} = useSession()
    const [cart, setCart] = useState(null)
    const [total, setTotal] = useState(null)
    const [loading, setLoading] = useState(true)
    const {cartLength, setCartLength} = useAppStateContext()
    const router = useRouter()

    useEffect(() => {
        console.log(session)
        setLoading(true)
        if (session) {
            client.fetch(`*[_type == "user" && _id == "${session.user?.id}"] {cart}`)
            .then(data => {
                console.log(data)
                let totalPrice = 0
                data[0].cart.map(book => {
                    totalPrice += parseFloat(book.price)
                    book.price = parseFloat(book.price).toFixed(2)
                })
                setCart(data[0].cart)
                totalPrice = parseFloat(totalPrice).toFixed(2)
                setTotal(totalPrice)
                setTimeout(() => setLoading(false), 500)
            })
            .catch(err => {
                console.log(err)
                setTimeout(() => setLoading(false), 500)
            })
        } else {
            setTimeout( () => setLoading(false), 500)
        }
    }, [session])

    const removeBookFromCart = (bookKey, bookPrice) => {
        const booksToRemoveQuery = [`cart[_key=="${bookKey}"]`]
        client.patch(session.user?.id)
        .unset(booksToRemoveQuery)
        .commit()
        .then(() => {
            setCart(prevState => prevState.filter(book => book._key !== bookKey))
            setCartLength(prevState => prevState - 1)
            setTotal(prevState => {
                return (prevState - bookPrice).toFixed(2)
            })
        })
        .catch(err => console.log(err))

    }
    const emptyCart = () => {
        const allBooksToRemove = ["cart"]
        client.patch(session.user.id).unset(allBooksToRemove).commit().then(res => {
            setCart([])
            setCartLength(0)
        }).catch(err => console.log(err))
    }

    const handleCheckout = async () => {
        let cartItems = cart
        cartItems.map( book => {
            book.quantity = 1
        })
        console.log(cartItems)

        const stripe = await getStripe()
        const response = await fetch("/api/stripe/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({cart: cartItems})
        }).catch(err => {
            console.log(err)
        })
        if (response.statusCode === 500) return

        const data = await response.json().then(data => stripe.redirectToCheckout({sessionId: data.id}))

    }
    if (loading) {
        return <div className="mx-10 my-6 flex justify-start">
                <Loading />
        </div>
    }

  return (
      <div className="mx-10 my-6 flex justify-start">
        { session ?<div>
        <h1 className="text-xl font-semibold my-6">Shopping Cart</h1>
        <div className="max-w-[1000px] border-t-4"> 
            
            <div className="pb-1 flex justify-around">
               
                <div className="p-2 font-semibold hover:bg-slate-700 hover:text-white">
                    <button type="button" onClick={() => emptyCart()}>Empty cart</button>
                </div>
                <div className="p-2 font-semibold hover:bg-slate-700 hover:text-white">
                    <Link href="/">Browse more</Link>
                </div>
            </div>
            <ul className="px-2">
                {cart?.length ? cart.map((book, i) => {
                    return (
                    <li key={i} className="border-t border-slate-300 py-2 flex justify-between gap-2">
                        <div className="flex gap-2">
                            <div>
                                <Link href={`/books/${getCategoryIndex(book.category)}/${book._id}`}>
                                    <img className="min-w-[50px]" src={urlFor(book.image).width(50)} alt="book" />
                                </Link>
                            </div>
                            <div className="flex flex-col space-between h-full">
                                <div>
                                    <Link href={`/books/${getCategoryIndex(book.category)}/${book._id}`} className="font-semibold">{book.name}</Link>
                                    <p>by <span className="text-sky-700">{book.author}</span></p>
                                </div>
                                <p className="font-semibold text-sm">Handcover</p>
                            </div>
                        </div>
                        <div className="ml-4 flex flex-col justify-between">
                            <p className="text-lg font-semibold">${book.price}</p>
                            <button onClick={() => removeBookFromCart(book._key, book.price)} className="text-sm font-semibold">Remove</button>
                        </div>
                    </li>
                    )
                }) : <p className="w-72 p-2">Your cart is empty</p>}
            </ul>
            <div className=" border-t-4 ">
                <div className="m-4 flex justify-between items-center">
                    <p className="text-lg">Subtotal ({ cart?.length} items): <span className="font-semibold">${total}</span> </p>
                    <button type="button" className="border text-sm border-slate-900 bg-amber-300 text-black  border px-2 " onClick={() => handleCheckout()}>Proceed to checkout</button>
                </div>
            </div>
        </div>
        </div>
        : 
        <div className=" mx-10 my-6 w-full">
            <p className="text-lg">Your cart is empty</p>
            <br />
            <button onClick={() => signIn()} className="border flex gap-1 items-center bg-slate-800 text-white font-semibold border px-2 py-1">Sign in to your account <img src="/login.svg" className="w-5 h-5 text-white" /></button>
        </div>
        }
    </div>
  )
}


export default Cart