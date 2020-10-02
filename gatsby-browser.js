const React = require('react')
const { ContextProvider } = require('./src/components/context/context')

// Shortcut to global styles
const style = document.documentElement.style

// Keep track of various heights
const sizeListener = () => {
  style.setProperty('--window-height', window.innerHeight + 'px')
  // style.setProperty('--header-height', window.innerWidth * 0.07606105367 + 'px')
  style.setProperty('--main-height', window.innerHeight - (window.innerWidth * 0.07606105367) + 'px')
  style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
}
sizeListener()
window.addEventListener('resize', sizeListener)

exports.wrapRootElement = ({ element }) => <ContextProvider>{element}</ContextProvider>
