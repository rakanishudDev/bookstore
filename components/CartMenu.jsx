import {useState, useEffect} from 'react'
import Link from 'next/link'
import { client, urlFor } from '../sanity/client'
import { useAppStateContext } from '../utilis/AppStateProvider'
import { getCategoryIndex } from '../utilis/categories'


const CartMenu = ({session}) => {
    const [booksToRemove, setBooksToRemove] = useState([])
    const [cart, setCart] = useState(null)
    const [remove, setRemove] = useState(false)
    const {cartLength, setCartLength} = useAppStateContext()
    useEffect(() => {
        if (session) {
            client.fetch(`*[_type == "user" && _id == '${session?.user?.id}'] {cart}`)
            .then(data => {
                console.log(data[0].cart)
                data[0].cart.map(book => {
                    book.price = parseInt(book.price).toFixed(2)
                })
                setCart(data[0].cart)
            }).catch(err => console.log(err))
        }
    }, [session])

    const cartCheckBox = (checked, bookId) => {
        if (checked === true) {
            setBooksToRemove(prevState => [...prevState, bookId])
            setRemove(true)
        } else {
            setBooksToRemove(prevState => prevState.filter(book => book !== bookId))
            if (booksToRemove.length === 1) {
                setRemove(false)
            }
        }
    }
    const removeBookFromCart = () => {
        booksToRemove.map(bookId => {
            const booksToRemoveQuery = [`cart[_key=="${bookId}"]`]
            client.patch(session.user?.id)
            .unset(booksToRemoveQuery)
            .commit()
            .then(() => {
                setBooksToRemove(prevState => prevState.filter(book => book !== bookId))
                setCart(prevState => prevState.filter(book => book._key !== bookId))
                setCartLength(prevState => prevState - 1)
            })
            .catch(err => console.log(err))
        })
    }
    const emptyCart = () => {
        const allBooksToRemove = ["cart"]
        client.patch(session.user.id).unset(allBooksToRemove).commit().then(res => {
            setCart([])
            setCartLength(0)
        }).catch(err => console.log(err))
    }

    const getCheckboxValue = (bookId) => {
        let checked = false 
        booksToRemove.map(book => {
            if (book === bookId) {
                return checked = true
            }
        })
        return checked
    }
  return (
    <div className="cartMenu  absolute right-0 top-13 bg-slate-100 border shadow-md px-1 py-1" >
        <div className="pb-1 flex justify-around min-w-[600px]">
            <div className="p-2 font-semibold hover:bg-slate-700 hover:text-white">
                <Link href="/account/cart">View cart</Link>
            </div>
            <div className="p-2 font-semibold hover:bg-slate-700 hover:text-white">
                <button type="button" onClick={() => emptyCart()}>Empty cart</button>
            </div>
            {remove === true ? <div className="p-2 font-semibold hover:bg-slate-700 hover:text-white">
                <button type="button" onClick={() => removeBookFromCart()}>Remove</button>
            </div> : <div className="p-2 text-gray-400 font-semibold">
                <p>Remove</p>
            </div>}
        </div>
        <ul className="px-2 ">
            {cart?.length ? cart.map((book, i) => {
                return (
                <li key={i} className="border-t border-slate-300 py-2">
                    <div className="flex items-center gap-2">
                        <div>
                            <input checked={getCheckboxValue(book._key)} type="checkbox" onChange={e => cartCheckBox(e.target.checked, book._key)} />
                        </div>
                            <Link className="min-w-[40px]" href={`/${getCategoryIndex(book.category)}/${book._id}`}>
                                <img src={urlFor(book.image).width(40)} width={40} height={80} alt="book" />
                            </Link>
                        <div>
                            <Link href={`/${getCategoryIndex(book.category)}/${book._id}`} className="font-semibold">{book.name}</Link>
                            <p>by <span className="text-sky-700">{book.author}</span></p>
                            <p>${book.price}</p>
                        </div>
                    </div>
                </li>
                )
            }) : <p className="w-72 p-2">Your cart is empty</p>}
        </ul>
    </div>
  )
}

export default CartMenu