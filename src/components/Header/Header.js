import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TokenService from '../../services/token-service'
import ThingContext from '../../contexts/ThingContext'
import './Header.css'

export default class Header extends Component {

  static contextType = ThingContext

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    this.context.mustLogIn();
  }

  handleLoginClick = (e) => {
    this.context.handleLoginClick();
  }


  renderLogoutLink() {
    return (
      <div className='Header__logged-in'>
        <Link
          onClick={e => this.handleLogoutClick(e)}
          to='/'>
          Logout
        </Link>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='Header__not-logged-in'>
        <Link
          to='/login'>
          Log in
        </Link>
        <Link
          to='/register'>
          Register
        </Link>
      </div>
    )
  }

  render() {
    return <>
      <nav className='Header'>
        <h1>
          <Link to='/'>
            <FontAwesomeIcon className='blue' icon='gift' />
            {' '}
            Thingful
          </Link>
        </h1>
        <span className='Header__tagline--wide'>Rate all the things.</span>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </nav>

      <span className='Header__tagline--narrow'>Rate all the things.</span>
    </>
  }
}
