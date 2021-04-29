import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
// import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
  const dispatch = useDispatch()

  // Fetch item sent to us
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  // Fetch the cart Items we stored locally
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  console.log('CartItems: ' + JSON.stringify(cartItems))

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <>
      <h1>Cart</h1>
    </>
  )
}

export default CartScreen
