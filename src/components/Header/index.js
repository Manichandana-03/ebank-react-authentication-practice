import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'

const Header = props => {
  const logoutUser = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <nav>
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
      </Link>
      <button type="button" onClick={logoutUser}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
