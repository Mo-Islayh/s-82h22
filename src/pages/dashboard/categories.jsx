import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import useCategory from "../../hooks/useCategore"
import { AiFillDelete, AiOutlineAppstoreAdd } from "react-icons/ai"
import { FaEdit } from "react-icons/fa"
import ModalCategoryANE from "../../components/Modals/ModalCategoryANE"
import ModalCategoryDelete from "../../components/Modals/ModalCategoryDelete"

const Categories = () => {
  const { categories, productsCategories } = useCategory()

  const handleModal = (modalName) => {
    setIsModalOpen((prev) => {
      return { ...prev, [modalName]: true }
    })
  }

  const modalInit = {
    add: false,
    delete: false,
  }

  const [isModalOpen, setIsModalOpen] = useState(modalInit)
  const closeModal = () => {
    setIsModalOpen(modalInit)
  }

  const [currentCat, setCurrentCat] = useState(null)

  return (
    <div className="categories-container">
      {isModalOpen.add && (
        <ModalCategoryANE
          currentCategory={currentCat}
          closeModal={closeModal}
        />
      )}
      {isModalOpen.delete && (
        <ModalCategoryDelete
          currentCategory={currentCat}
          closeModal={closeModal}
        />
      )}
      <div className="products-line-head">
        <p>Categories</p>
        <button
          onClick={() => {
            handleModal("add")
            setCurrentCat(null)
          }}
        >
          <div> Add Category</div>
          <AiOutlineAppstoreAdd size={18} />
        </button>
      </div>
      <div className="categories-items-container">
        {categories?.map((catItem, _catId) => (
          <div className="catergoies-con" key={_catId}>
            <p className="cate-item-name">{catItem}</p>
            {!productsCategories.includes(catItem) && (
              <div className="actions-container">
                <button
                  className="actions-btn"
                  onClick={() => {
                    handleModal("add")
                    setCurrentCat(catItem)
                  }}
                >
                  <p>Edit</p>
                  <FaEdit />
                </button>
                <button
                  className="actions-btn"
                  onClick={() => {
                    handleModal("delete")
                    setCurrentCat(catItem)
                  }}
                >
                  <p>Delete</p>
                  <AiFillDelete />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories
