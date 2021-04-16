import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
// import Product from '../components/Product'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { products } = productList
  console.log('Products: ' + JSON.stringify(products))

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return <h1>HomeScreen</h1>
}

export default HomeScreen
