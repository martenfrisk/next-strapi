import {
  useState,
  useEffect,
  useReducer,
  useContext,
  createContext
} from 'react'

type ICartContext = {
  state: any,
  showCart: any
}

// @ts-ignore
const CartContext = createContext<ICartContext>(null)
// @ts-ignore
const CartDispatch = createContext()

const isBrowser = typeof window !== 'undefined'

export type ActionType = {
  type: 'ADD_ITEM' | 'REMOVE' | 'INCREASE' | 'DECREASE' | 'CLEAR',
  payload: {
    slug: string,
    name: string,
    quantity: number,
    price: number,
    image: any
  }
}

const initialState: any[] = []

function moveToFirst(fromIndex: number, array: any[]) {
  const arr = [...array]
  arr.splice(0, 0, ...arr.splice(fromIndex, 1));
  return arr
}

const reducer = (state: any, action: ActionType) => {
  switch (action.type) {
    case 'ADD_ITEM':
      console.log({state})
      console.log({action})
      if (state.some((i: ActionType['payload']) => i.slug === action.payload.slug)) {
        state.map((item: ActionType['payload']) => {
          if (item.slug === action.payload.slug) {
            console.log('duplicate found')
            return { ...item, quantity: item.quantity++ }
          }
          return item
        })
        const elPos = state.findIndex((x: ActionType['payload']) => x.slug === action.payload.slug)
        state = moveToFirst(elPos, state)
        return state
      } else {
        const newObj = [{
          name: action.payload.name,
          slug: action.payload.slug,
          price: action.payload.price,
          image: action.payload.image,
          quantity: action.payload.quantity
        }]
        return newObj.concat(state)
      }
    case 'REMOVE':
      console.log('removing')
      return state.filter((i: ActionType['payload']) => i.slug !== action.payload.slug)
    case 'INCREASE':
      console.log('increasing')
      return state.map((i: ActionType['payload']) => {
        if (i.slug === action.payload.slug) {
          return { ...i, quantity: i.quantity + 1}
        }
        return i
      })
    case 'DECREASE':
      console.log('decreasing')
      return state.map((i: ActionType['payload']) => {
        if (i.slug === action.payload.slug) {
          if (i.quantity === 1 ) {
            return i
          }
          return { ...i, quantity: i.quantity - 1 }
        }
        return i
      })
    case 'CLEAR':
      console.log('clearing')
      return (state = initialState)
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

function setLocalStorage(key: string, value: string) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error(e)
  }
}

function getLocalStorage(key: string, initialValue: any[]) {
  try {
    if (window.localStorage.getItem(key) === undefined) {
      window.localStorage.setItem(key, JSON.stringify(initialState))
    } else if (window.localStorage.getItem(key) === null) {
      window.localStorage.setItem(key, JSON.stringify(initialState))
    }
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : initialValue
  } catch (e) {
    console.error(e)
    return null
  }
}

export const CartProvider = ({ children }: { children: any }) => {
  const [localState, ] = useState(
    () => isBrowser && getLocalStorage('strapi-cart', initialState)
  )

  const [visible, setVisible] = useState(false)
  const [state, dispatch] = useReducer(reducer, localState)

  useEffect(() => {
    setLocalStorage('strapi-cart', state)
  }, [state])

  return (
    <CartDispatch.Provider value={dispatch}>
      <CartContext.Provider
        value={{
          state,
          showCart: [visible, setVisible]
        }}
      >
        {children}
      </CartContext.Provider>
    </CartDispatch.Provider>
  )
}

export const useCart = () => useContext(CartContext)
export const useDispatchCart = () => useContext(CartDispatch)