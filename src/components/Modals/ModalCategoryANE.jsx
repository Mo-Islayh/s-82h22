import React, { useRef } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeCategories } from "../../redux/reducers/products"
import useCategory from "../../hooks/useCategore"

function ModalCategoryANE({ closeModal, currentCategory }) {
  const dispatch = useDispatch()

  const [cateError, setCateError] = useState("")
  // const CategoeiesArray = useSelector((state) => state.products.categories)

  const { categories, productsCategories } = useCategory()

  const [name, setName] = useState(currentCategory ?? "")

  const onClose = () => {
    closeModal()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name.trim()) {
      setCateError("Must Add A Name")
      return
    }

    if (currentCategory) {
      const myNewArrau = [...categories].map((cat) => {
        if (cat === currentCategory) {
          return name
        }
        return cat
      })
      dispatch(changeCategories(myNewArrau))
    } else {
      const myNewArrau = [...categories]
      myNewArrau.push(name)
      dispatch(changeCategories(myNewArrau))
    }
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
        <p className="modal-body-header">
          {currentCategory ? "Edit Category" : "Add Category"}
        </p>
        <div className="modal-inputs">
          <label htmlFor="name">UserName</label>
          <input
            value={name}
            id="name"
            type="text"
            placeholder="Name"
            required
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
          {cateError && <p className="modal-cate-error">{cateError}</p>}
        </div>
        <div className="modal-actions">
          <button type="button" onClick={onClose}>
            CANCEL
          </button>
          <button type="submit"> {currentCategory ? "EDIT" : "ADD"} </button>
        </div>
      </form>
    </div>
  )
}

export default ModalCategoryANE
