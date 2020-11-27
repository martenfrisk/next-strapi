import { useState, useEffect } from 'react'
// import Link from 'next/link'
import { useCart, useDispatchCart, ActionType } from '@/components/cart/cart-context'

const Cart = () => {
  const { state, showCart } = useCart()
  const [cartState, setCartState] = useState(state)
  const [visible, setVisible] = showCart
  const dispatch: any = useDispatchCart()

  useEffect(() => {
    setCartState(state)
  }, [state])

  const handleRemoveItem = (slug: string) => {
    dispatch({
      type: 'REMOVE',
      payload: {
        slug
      }
    })
  }
  const handleAdjustQuantity = (slug: string, action: ActionType['type']) => {
    dispatch({
      type: action,
      payload: {
        slug
      }
    })
  }
  const handleRemoveAll = () => {
    dispatch({
      type: 'CLEAR'
    })
  }

  let sumTotal: number = 0, itemCount: number = 0
  if (state) {
    sumTotal = state.reduce(
      (acc: number, curr: { quantity: number; price: number })  => acc + curr.quantity * curr.price, 0
    )
    itemCount = state.reduce(
      (acc: number, curr: { quantity: number; price: number }) => acc + curr.quantity,
      0
    )
  }
  
  return (
    <>
        <div
          onClick={() => visible ? setVisible(false) : setVisible(true)}
          className="text-sm font-light uppercase cursor-pointer font-sansa text-coolgray-600"
        >
          Cart
          <span className="hidden text-base sm:inline">
            {visible ? ' <' : ' >'}
          </span>
          <span className="inline text-base sm:hidden">
            {visible ? ' ᐃ' : ' ᐁ'}
          </span>
        </div>
        <div className={`bg-white sticky w-full top-0 sm:w-48 border  border-coolgray-600 py-4 pr-3 pl-5 normal-case text-sm text-coolgray-600 ${visible ? 'block' : 'hidden'}`}>
          {cartState && cartState.length === 0 ? (
            <div>Empty cart.</div>
          ) : (
              state && (
                <div>
                  {state.map((cartItem: ActionType['payload']) => (
                    <div>
                      <div key={cartItem.slug} className="flex justify-between w-full">
                        <div className="flex w-2/3">
                          <span 
                            onClick={() => handleRemoveItem(cartItem.slug)}
                            className="absolute -ml-3 text-xs cursor-pointer text-coolgray-400 hover:text-coolgray-600"
                          >
                            X
                          </span>
                          {cartItem.name}
                        </div>
                        <div className="flex space-x-3">
                          <div className="cursor-pointer" onClick={() => handleAdjustQuantity(cartItem.slug, 'DECREASE')}>
                            -
                          </div>
                          <div className="cursor-pointer" onClick={() => handleAdjustQuantity(cartItem.slug, 'INCREASE')}>
                            +
                          </div>
                        </div>
                        <div className="w-4 pr-1 text-right">
                          {cartItem.quantity}
                        </div>
                      </div>
                      <div className="flex items-end justify-between w-full text-xs">
                        <span>
                          {cartItem.price}:- each
                        </span>
                        <span>
                          {cartItem.price * cartItem.quantity}:-
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between pt-1 mt-4 border-t border-coolgray-300">
                    <span>{itemCount} products</span>  
                    <span>Total {sumTotal}:-</span>
                  </div>
                  <div className="flex justify-between mt-4 text-xs font-light">
                    <div onClick={handleRemoveAll} className="cursor-pointer">
                      Clear cart
                    </div>
                    <div>
                      Checkout
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
    </>
  )
}

export default Cart