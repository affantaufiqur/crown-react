import { useContext, Fragment } from 'react'
import { CategoriesContext } from '../../context/categories.context'
import ProductCard from '../../components/product-card/product-card.component'
import './shop.styles.scss'

const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext)
  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => (
        <Fragment key={title}>
          <h2 className="categories-title">{title[0].toUpperCase() + title.substring(1)}</h2>
          <div className="container">
            <div className="products-container">
              {categoriesMap[title].map((product) => (
                <ProductCard
                  product={product}
                  key={product.id}
                />
              ))}
            </div>
          </div>
        </Fragment>
      ))}
    </Fragment>
  )
}
export default Shop
