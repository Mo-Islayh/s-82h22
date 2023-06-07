import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const useCategory = () => {
  const ProductsArray = useSelector((state) => state.products.products)
  const CategoriesArray = useSelector((state) => state.products.categories)
  const [categories, setCategories] = useState([])
  const [productsCategories, setProductsCategories] = useState([])
  useEffect(() => {
    const cats = []
    ProductsArray?.map((prodItem, _prodId) =>
      prodItem.categories?.map((catItem, _catId) => {
        if (!cats.includes(catItem)) {
          cats.push(catItem)
        }
      })
    )

    for (let string of CategoriesArray) {
      if (!cats.includes(string)) {
        cats.push(string)
      }
    }
    setCategories(cats)
  }, [ProductsArray, CategoriesArray])

  useEffect(() => {
    const cats = []
    ProductsArray?.map((prodItem, _prodId) =>
      prodItem.categories?.map((catItem, _catId) => {
        if (!cats.includes(catItem)) {
          cats.push(catItem)
        }
      })
    )
    setProductsCategories(cats)
  }, [ProductsArray])

  return { categories, productsCategories }
}

export default useCategory
