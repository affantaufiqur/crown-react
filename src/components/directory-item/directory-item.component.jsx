import './directory-item.styles.scss'

const DirectoryItem = ({ category }) => {
  const { imageUrl, title } = category
  return (
    <div className="directory-item-container">
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
