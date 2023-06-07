import React, { useState } from "react"
import { AiFillDelete, AiOutlineAppstoreAdd } from "react-icons/ai"
import { FaEdit } from "react-icons/fa"
import { useSelector } from "react-redux"
import ModalAddProduct from "../../components/Modals/ModalProductANE"
import ModalDeleteProduct from "../../components/Modals/ModalProductDelete"

function Products() {
  const ProductsArray = useSelector((state) => state.products.products)

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

  const [currentProduct, setCurrentProduct] = useState(null)

  return (
    <div className="products-container">
      {isModalOpen.add && (
        <ModalAddProduct
          closeModal={closeModal}
          currentProduct={currentProduct}
        />
      )}
      {isModalOpen.delete && (
        <ModalDeleteProduct
          closeModal={closeModal}
          currentProduct={currentProduct}
        />
      )}

      <div className="products-line-head">
        <p>Products</p>
        <button
          onClick={() => {
            handleModal("add")
            setCurrentProduct(null)
          }}
        >
          <div> Add Product</div>
          <AiOutlineAppstoreAdd size={18} />
        </button>
      </div>
      <div className="products-table-container">
        <table>
          <thead>
            <tr>
              {/* <th>Id</th> */}
              <th>Name</th>
              <th>Categories</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...ProductsArray].reverse()?.map((prodItem, _prodId) => (
              <tr key={_prodId}>
                {/* <td className="table-text">{_prodId + 1}</td> */}
                <td className="table-text">{prodItem.name}</td>
                <td className="table-text">
                  <div className="table-categories-container">
                    {prodItem.categories?.map((catItem, _catId) => (
                      <div className="categories-item" key={_catId}>
                        {catItem}
                      </div>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="actions-container">
                    <button
                      className="actions-btn"
                      onClick={() => {
                        handleModal("add")
                        setCurrentProduct(prodItem)
                      }}
                    >
                      <p>Edit</p>
                      <FaEdit />
                    </button>
                    <button
                      className="actions-btn"
                      onClick={() => {
                        handleModal("delete")
                        setCurrentProduct(prodItem)
                      }}
                    >
                      <p>Delete</p>
                      <AiFillDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Products
