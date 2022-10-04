import { createContext, useReducer } from 'react'
import { createAction } from '../utils/reducer/reducer.utils'

export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItems = cartItems.find((cartItem) => cartItem.id === productToAdd.id)
  if (existingCartItems) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
    )
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

export const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItems = cartItems.find((cartItem) => cartItem.id === productToRemove.id)
  if (existingCartItems.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)
  }
  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem,
  )
}

export const clearItemInCheckout = (cartItems, productToRemove) =>
  cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
})

const INITIAL_STATE = {
  cartCount: 0,
  cartTotal: 0,
  cartItems: [],
  isCartOpen: false,
}

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

const cartReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`)
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      }
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)
  const { cartCount, cartTotal, cartItems, isCartOpen } = state

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      }),
    )
  }

  const setIsCartOpen = (boolean) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean))
  }

  const addItemToCart = (product) => {
    const newCartItems = addCartItem(cartItems, product)
    updateCartItemsReducer(newCartItems)
  }

  const removeItemFromCart = (product) => {
    const newCartItems = removeCartItem(cartItems, product)
    updateCartItemsReducer(newCartItems)
  }

  const clearItemFromCart = (product) => {
    const newCartItems = clearItemInCheckout(cartItems, product)
    updateCartItemsReducer(newCartItems)
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemFromCart,
    clearItemFromCart,
    cartTotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
