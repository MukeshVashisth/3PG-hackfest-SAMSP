import React from 'react'
import PropTypes from 'prop-types'

export default function Button({ handleClick, title, cssClass }) {
  return (
    <button className={cssClass} onClick={handleClick}>{title}</button>
  )
}

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  cssClass: PropTypes.string.isRequired
}
