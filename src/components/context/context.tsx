import React, { createContext, useEffect, useState } from 'react'

const Context = createContext(null)

const ContextProvider = ({ children }) => {
  const [quote, setQuote] = useState([])
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    window.fetch('/.netlify/functions/hello-world', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Matt'
      })
    }).then(async res => {
      if (res.ok) {
        const body = await res.json()
        console.log('this', body)
      } else {
        console.log('error')
      }
    })
  }, [])

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
    window.localStorage.setItem('quote', JSON.stringify(quote))
    updateQuantity()
    console.log(quote)
  }, [quote])

  return (
    <Context.Provider value={{ quantity, quote, setQuote, handleAddQuoteItem, handleRemoveQuoteItem, handleUpdateQuoteItem }}>
      {children}
    </Context.Provider>)
}

export { Context, ContextProvider }
