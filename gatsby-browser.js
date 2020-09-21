// Required imports
const { colors } = require('./.forestry/content/settings/colors.json')
const { fonts } = require('./.forestry/content/settings/fonts.json')
const slugify = require('slugify')
// const Bowser = require('bowser')

// const browser = Bowser.getParser(window.navigator.userAgent)

// console.log(`The current browser name is "${browser.getBrowserName()}"`)

// Shortcut to global styles
const style = document.documentElement.style

// Create variables for console logs
let colorVariables = ''
let fontVariables = ''

// Keep track of various heights
const sizeListener = () => {
  style.setProperty('--window-height', window.innerHeight + 'px')
  style.setProperty('--header-height', window.innerWidth * 0.07606105367 + 'px')
  style.setProperty('--main-height', window.innerHeight - (window.innerWidth * 0.07606105367) + 'px')
  style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
}
sizeListener()
window.addEventListener('resize', sizeListener)

// Assign global color variables
colors.forEach(({ name, color }) => {
  style.setProperty(`--color-${slugify(name).toLowerCase()}`, color)
  // Append color to console message
  colorVariables += `\n ∙ ${name}: var(--color-${slugify(name).toLowerCase()})`
})

// Assign global font variables
fonts.forEach(font => {
  style.setProperty(`--font-${slugify(font.name).toLowerCase().replace(';', '')}`, `normal normal ${font.weight} 1vw ${font.family}`)
  // Append font to console message
  fontVariables += `\n ∙ ${font.name}: var(--font-${slugify(font.name).toLowerCase().replace(';', '')})`
})

// Log variables to console
console.log(
  // Output
  '%c Station' +
  '%c8 ' +
  '%c\n\n🌍 GLOBAL VARIABLES' +
  '%c\nThe following variables can be used in place of standard CSS values like: ' +
  '%cheight: var(--window-height);' +
  '%c.' +
  '%c\n\n🎨 Colors' +
  `%c${colorVariables}` +
  '\n\n' +
  '%c✍️ Fonts' +
  `%c${fontVariables}` +
  '\n\n' +
  '%c📐 Dimensions' +
  '%c\n ∙ Window Height: var(--window-height)\n ∙ Header Height: var(--header-height)\n ∙ Main Height: var(--main-height)\n ∙ One Viewport Height Unit: var(--vh)',
  // Styles
  'font-family: Arial, Helvetica, sans-serif; font-size: 3rem; font-weight: bold; color: white; background-color: black;',
  'font-family: Arial, Helvetica, sans-serif; font-size: 3rem; color: #D82128; font-weight: bold; background-color: black;',
  'font-family: Arial, Helvetica, sans-serif; font-weight: bold; font-size: 1.2rem;',
  'font-family: Arial, Helvetica, sans-serif; font-weight: regular; font-style: italic; color: gray;',
  'font-family: "Courier New", Courier, monospace; background-color: #eee',
  'font-family: Arial, Helvetica, sans-serif; font-weight: regular; font-style: italic; color: gray;',
  'font-family: Arial, Helvetica, sans-serif; font-weight: bold;',
  'font-family: Arial, Helvetica, sans-serif; font-weight: normal',
  'font-family: Arial, Helvetica, sans-serif; font-weight: bold;',
  'font-family: Arial, Helvetica, sans-serif; font-weight: normal;',
  'font-family: Arial, Helvetica, sans-serif; font-weight: bold;',
  'font-family: Arial, Helvetica, sans-serif; font-weight: normal;'
)
