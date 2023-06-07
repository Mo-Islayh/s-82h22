import React, { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeCategories } from "../../redux/reducers/products"

function ModalCategoryDelete({ closeModal, currentCategory }) {
  const CategoriesArray = useSelector((state) => state.products.categories)

  const dispatch = useDispatch()

  const onClose = () => {
    closeModal()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newArra = [...CategoriesArray].filter(
      (user) => user !== currentCategory
    )

    dispatch(changeCategories(newArra))
    closeModal()
  }

  const parentRef = useRef(null)

  const handleCloseFromParent = (event) => {
    if (event.target === parentRef.current) {
      closeModal()
    }
  }

  return (
    <div
      className="modal-container"
      onClick={handleCloseFromParent}
      ref={parentRef}
    >
      <form className="modal-body" onSubmit={handleSubmit}>
        <p className="modal-body-header">Delete Category</p>
        <p>
          This action will remove the selected category, Are you sure about that
          ?
        </p>
        <div className="modal-actions">
          <button type="button" onClick={onClose}>
            CANCEL
          </button>
          <button type="submit">OKAY</button>
        </div>
      </form>
    </div>
  )
}

export default ModalCategoryDelete
