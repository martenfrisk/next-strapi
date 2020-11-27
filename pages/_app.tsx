import '@/css/tailwind.css'
import { CartProvider } from '@/components/cart/cart-context'

export default function App({ Component, pageProps }: { Component: any, pageProps: any}) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  )
}