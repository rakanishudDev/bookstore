import Stripe from "stripe"
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const params = {
                submit_type: "pay",
                payment_method_types: ["card"],
                billing_address_collection: "auto",
                shipping_options: [
                    {shipping_rate: "shr_1MRbruCbQ5k024OvYp1WEzDf"},
                    {shipping_rate: "shr_1MRbwwCbQ5k024OvfcF82o3E"}
                ],
                line_items: req.body.cart.map(book => {
                    const img = book.image.asset._ref
                    const newImage = img.replace("image-", "https://cdn.sanity.io/images/18td31w2/production/").replace("-jpg", ".jpg")

                    return {
                        price_data: {
                            currency: "eur",
                            product_data: {
                                name: book.name,
                                images: [newImage]
                            },
                            unit_amount: Math.ceil(book.price * 100)
                        },
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                        },
                        quantity: book.quantity
                    }
                }),
                mode: "payment",
                success_url: `${req.headers.origin}/success/?stripe=true`,
                cancel_url: `${req.headers.origin}/?canceled=true`
            }
            const session = await stripe.checkout.sessions.create(params);
            res.status(200).json(session)
        } catch(error) {
            res.status(500).json({statusCode: 500, message: error.message})
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(400).end("Method Not Allowed")
    }
}