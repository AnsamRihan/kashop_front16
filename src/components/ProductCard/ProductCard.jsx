import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../ui/card'
import { ShoppingCart, Star } from 'lucide-react'
import { Button } from '../ui/button'
import useAddToCart from '@/hooks/useAddToCart'
import { toast } from "sonner";

export default function ProductCard({ product }) {
    const { mutate: addToCart } = useAddToCart();

    return (
        <Link to={`/product/${product.id}`} className="block w-full h-full group py-2">
            <Card className=' w-full h-full p-3 ring-background-border hover:shadow-md transition-all duration-200 ease-in-out
        dark:hover:shadow-[0_4px_25px_rgba(208,194,208,0.3)]'>
                <div className="h-full stack gap-5">
                    {/*Card Image */}
                    <div className="w-full overflow-clip rounded-lg">
                        <img src={product.image}
                            alt={product.name} className="aspect-square w-full
                    transition-transform duration-500 ease-out group-hover:scale-105"/>
                    </div>

                    {/*Product Info */}
                    <div className="w-full h-full stack justify-between gap-4">
                        <div className="w-full stack items-start gap-1.5">
                            <h3 className="capitalize text-heading-foreground font-semibold text-[15px]
                        group-hover:text-primary transition-all duration-150 ease-in-out">
                                {product.name}
                            </h3>

                            {/*Rating */}
                            <div className="row gap-1">
                                <div className="row gap-0">
                                    {Array.from({ length: Math.floor(product.rate) }, (_, i) => (
                                        <Star key={i} className="size-3 text-primary" fill="currentColor" strokeWidth={0} />
                                    ))}
                                </div>
                                <span className="text-heading-foreground font-semibold text-xs">
                                    {product.rate.toFixed(1)}
                                </span>
                            </div>
                        </div>

                        <div className="w-full row justify-between">
                            <span className="text-primary text-base font-semibold">
                                ${product.price.toFixed(2)}
                            </span>
                            <Button size='icon' className='p-2' onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();

                                addToCart(
                                    {
                                        ProductId: product.id,
                                        Count: 1
                                    },
                                    {
                                        onSuccess: () => {
                                            toast.success("Product added to cart");
                                        },
                                        onError: (error) => {
                                            toast.error(
                                                error.response?.data?.message ||
                                                "Failed to add product to cart"
                                            );
                                        },
                                    }
                                );
                            }}>
                                <ShoppingCart strokeWidth={2.5} />
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    )
}
