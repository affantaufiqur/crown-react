import DirectoryItem from '../directory-item/directory-item.component'
import './categories-directory.styles.scss'

const CategoryDirectory = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <DirectoryItem
          key={category.id}
          category={category}
        />
      ))}
    </div>
  )
}
export default CategoryDirectory
