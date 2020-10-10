import React, { createContext, useEffect, useState } from 'react'

const Context = createContext(null)

const ContextProvider = ({ children }) => {
  const [quote, setQuote] = useState([])
  const [quantity, setQuantity] = useState(0)
  const [user, setUser] = useState(undefined)

  const auth = el => user && user.id ? el : null

  const updateQuantity = () => {
    let quantity = 0
    quote.forEach(item => {
      quantity += parseInt(item.quantity)
    })
    setQuantity(quantity)
  }
  const handleAddQuoteItem = item => {
    const newQuote = quote
    newQuote.push(item)
    setQuote(newQuote)
  }
  const handleRemoveQuoteItem = index => {
    setQuote(quote.filter((lineItem, i) => i !== index))
  }
  const handleUpdateQuoteItem = (item, index) => {
    const newQuote = quote
    newQuote[index] = item
    setQuote(newQuote)
  }

  useEffect(() => {
    const localStorage = window.localStorage.getItem('quote')
    setQuote(localStorage ? JSON.parse(localStorage) : [])
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      handleValidateUser()
    }
  }, [])

  const handleLogoutUser = async e => {
    e.preventDefault()
    setUser(undefined)
    const res = await window.fetch('/.netlify/functions/logout', {
      method: 'GET'
    })
    if (res.ok) {
      const body = await res.json()
      console.log(body)
    }
  }

  const handleValidateUser = async () => {
    const res = await window.fetch('/.netlify/functions/authenticate')
    if (res.ok) {
      const body = await res.json()
      console.log(body)
      setUser({
        id: body.userId,
        firstName: body.user['First Name'],
        lastName: body.user['Last Name'],
        email: body.user.Email,
        company: body.user.Company,
        phone: body.user['Phone Number'],
        address1: body.user['Address Line 1'],
        address2: body.user['Address Line 2'],
        city: body.user.City,
        state: body.user.State,
        zipCode: body.user.ZIP
      })
    } else {
      setUser(undefined)
    }
  }

  useEffect(() => {
    console.log(user)
  }, [user])

  useEffect(() => {
    window.localStorage.setItem('quote', JSON.stringify(quote))
    updateQuantity()
    console.log(quote)
  }, [quote])

  return (
    <Context.Provider value={{ auth, handleLogoutUser, handleValidateUser, user, quantity, quote, setQuote, handleAddQuoteItem, handleRemoveQuoteItem, handleUpdateQuoteItem }}>
      {children}
    </Context.Provider>)
}

export { Context, ContextProvider }
