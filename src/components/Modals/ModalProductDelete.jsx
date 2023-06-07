import React, { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeProducts } from "../../redux/reducers/products"

function ModalDeleteProduct({ closeModal, currentProduct }) {
  const ProductsArray = useSelector((state) => state.products.products)

  const dispatch = useDispatch()

  const onClose = () => {
    closeModal()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newArra = [...ProductsArray].filter(
      (product) => product !== currentProduct
    )

    dispatch(changeProducts(newArra))
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
        <p className="modal-body-header">Delete Product</p>
        <p>
          This action will remove the selected product, Are you sure about that
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

export default ModalDeleteProduct
