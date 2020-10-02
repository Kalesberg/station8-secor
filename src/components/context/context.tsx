import React, { createContext, useEffect, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

const Context = createContext(null)

const ContextProvider = ({ children }) => {
  return <Context.Provider value={{ }}>{children}</Context.Provider>
}

export { Context, ContextProvider }
