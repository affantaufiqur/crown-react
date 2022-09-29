import { useContext } from 'react'
import './cart-dropdown.styles.scss'
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import { CartContext } from '../../context/cart.context'

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext)
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((cartItem) => (
          <CartItem
            cartItem={cartItem}
            key={cartItem.id}
          />
        ))}
      </div>
      <Button>CHECKOUT</Button>
    </div>
  )
}
export default CartDropdown
