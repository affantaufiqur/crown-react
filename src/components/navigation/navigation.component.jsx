import { Fragment, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Logo from '../../assets/crown.svg'
import { NavigationContainer, NavLink, NavLinks, LogoContainer } from './navigation.styles.jsx'
import { UserContext } from '../../context/user.context'
import { signUserOut } from '../../utils/firebase/firebase.utils'
import { CartContext } from '../../context/cart.context'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'

const Navigation = () => {
  const { currentUser } = useContext(UserContext)
  const { isCartOpen } = useContext(CartContext)

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <img
            src={Logo}
            alt="logo"
            className="logo"
          />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">Shop</NavLink>
          {currentUser ? (
            <NavLink
              as="span"
              onClick={signUserOut}
            >
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation
