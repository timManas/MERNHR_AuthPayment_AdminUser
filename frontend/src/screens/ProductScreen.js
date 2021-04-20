import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { productDetails } from '../actions/productActions'
import Product from '../components/Product'

const ProductScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const { product } = useSelector((state) => state.productDetails)
  console.log('Product Details: ' + JSON.stringify(product))

  useEffect(() => {
    dispatch(productDetails(match.params.id))
  }, [dispatch])

  return (
    <>
      <h1>Product Screen</h1>
    </>
  )
}

export default ProductScreen
