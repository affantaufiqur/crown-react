import ShoppingIcon from '../../assets/shopping-bag.svg'
import './cart-icon.styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector'
import { setIsCartOpen } from '../../store/cart/cart.action'

const CartIcon = () => {
  const dispatch = useDispatch()
  const cartCount = useSelector(selectCartCount)
  const isCartOpen = useSelector(selectIsCartOpen)
  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen))

  return (
    <div
      className="cart-icon-container"
      onClick={toggleIsCartOpen}
    >
      <img
        src={ShoppingIcon}
        className="shopping-icon"
      />
      <span className="item-count">{cartCount}</span>
    </div>
  )
}
export default CartIcon
