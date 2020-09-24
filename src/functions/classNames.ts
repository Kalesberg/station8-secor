import camelcase from 'camelcase'

export default (element, styles) => {
  if (element && element.settings && element.settings.class) {
    return ['default', element.settings.class].map(name => styles[camelcase(name)]).join(' ').trim()
  }
  return styles.default
}
