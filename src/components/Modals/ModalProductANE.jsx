import React, { useRef } from "react"
import { useState } from "react"
import useCategory from "../../hooks/useCategore"
import { IoIosRemoveCircle } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { changeProducts } from "../../redux/reducers/products"

function ModalAddProduct({ closeModal, currentProduct }) {
  const dispatch = useDispatch()
  const { categories } = useCategory()

  const [chosenCtegories, setChosenCtegories] = useState(
    currentProduct?.categories ?? []
  )
  const [realTimeCategis, setRealTimeCategis] = useState([])
  const [cateError, setCateError] = useState("")
  const ProductsArray = useSelector((state) => state.products.products)
  // const nameRef = useRef(null)
  const [name, setName] = useState(currentProduct?.name ?? "")

  const onClose = () => {
    closeModal()
  }

  const [category, setCategory] = useState("")
  const handleCategsChange = (e) => {
    const value = e.target.value
    const lawerValue = e.target.value.toLowerCase()
    const lowerA = chosenCtegories.map((item) => item.toLowerCase())

    setCategory(value)
    setRealTimeCategis(
      lawerValue.split(/,\s*/).filter((item) => {
        if (item !== "" && !lowerA.includes(item)) {
          return item
        }
      })
    )
  }

  const handleChosenCats = (e) => {
    const value = e.target.value
    const lowerValue = e.target.value.toLowerCase()

    const lowerA = chosenCtegories.map((item) => item.toLowerCase())
    const lowerB = realTimeCategis.map((item) => item.toLowerCase())

    if (value && !lowerA.includes(lowerValue) && !lowerB.includes(lowerValue)) {
      setChosenCtegories(() => {
        return [...chosenCtegories, value]
      })
    }
  }

  const handleRemoveCaterory = (value) => {
    const xArray = [...chosenCtegories].filter((item) => item !== value)
    setChosenCtegories(xArray)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const concatCategories = [...realTimeCategis, ...chosenCtegories]

    if (!name.trim()) {
      setCateError("Must Add A Name")
      return
    }
    if (concatCategories.length === 0) {
      setCateError("Must Add 1 Category At Least")
      return
    }

    if (currentProduct) {
      const myNewArrau = [...ProductsArray].map((product) => {
        if (product.productId === currentProduct.productId) {
          return {
            name,
            categories: concatCategories,
            productId: currentProduct.productId,
          }
        }
        return product
      })

      dispatch(changeProducts(myNewArrau))
    } else {
      const myNewArrau = [...ProductsArray]
      myNewArrau.push({
        name,
        categories: concatCategories,
        productId: `prod${new Date().getTime()}`,
      })
      dispatch(changeProducts(myNewArrau))
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
          {currentProduct ? "Edit Product" : "Add Product"}
        </p>
        <div className="modal-inputs">
          <label htmlFor="name">Name</label>
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
          <label htmlFor="categories">Categories</label>
          <input
            id="categories"
            type="text"
            placeholder="Separate multiple Categories with comma ( , )"
            onChange={handleCategsChange}
            value={category}
          />
          {realTimeCategis.length !== 0 && (
            <div className="modal-categories">
              {realTimeCategis.map((item, _id) => (
                <div className="modal-categories-item" key={_id}>
                  {item}
                </div>
              ))}
            </div>
          )}
          {chosenCtegories.length !== 0 && (
            <div className="modal-categories">
              {chosenCtegories.map((item, _id) => (
                <div
                  className="modal-categories-item modal-categories-item-remove"
                  key={_id}
                  onClick={() => {
                    handleRemoveCaterory(item)
                  }}
                >
                  {item}
                  <IoIosRemoveCircle size={20} />
                </div>
              ))}
            </div>
          )}
          <div className="modal-categories-select">
            <label htmlFor="selectcats">Choose from exciting ones</label>
            <select id="selectcats" onChange={handleChosenCats} value={1}>
              {[
                "",
                ...categories.filter((it) => !chosenCtegories.includes(it)),
              ]?.map((item, _id) => (
                <option key={_id} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {cateError && <p className="modal-cate-error">{cateError}</p>}
        </div>
        <div className="modal-actions">
          <button type="button" onClick={onClose}>
            CANCEL
          </button>
          <button type="submit">ADD</button>
        </div>
      </form>
    </div>
  )
}

export default ModalAddProduct
