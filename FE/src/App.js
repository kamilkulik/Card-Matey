import React from 'react'
import PropTypes from 'prop-types'
import AppRouter from './router/AppRouter'
import ThemeContext from './ThemeContext'

const App = ({ cachedThemes }) => (
  <ThemeContext.Provider value={cachedThemes}>
    <AppRouter />
  </ThemeContext.Provider>
)

App.propTypes = {
  cachedThemes: PropTypes.objectOf(Object).isRequired,
}

export default App
