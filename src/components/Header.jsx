import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Header = props => {
  return (
    <header>
      <h2 className='logo'>Face ID</h2>
      <div className='userInfo'>{`${props.user.fname} ${props.user.lname}`}</div>
    </header>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

Header.propTypes = {
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(Header)
