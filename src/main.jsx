import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/user.context'
import { ProductsProvider } from './context/products.context'
import { CartProvider } from './context/cart.context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductsProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
