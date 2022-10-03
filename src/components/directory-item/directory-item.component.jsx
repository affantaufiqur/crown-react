import './directory-item.styles.scss'
import { useNavigate } from 'react-router-dom'

const DirectoryItem = ({ category }) => {
  const { imageUrl, title, route } = category
  const navigate = useNavigate()

  const onNavigateHandler = () => navigate(route)

  return (
    <div
      className="directory-item-container"
      onClick={onNavigateHandler}
    >
      <img
        src={imageUrl}
        alt={title}
        className="background-image"
      />
      <div className="directory-item-body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  )
}

export default DirectoryItem
