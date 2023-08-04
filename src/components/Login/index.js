import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    userid: '',
    pin: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUserId = event => {
    this.setState({userid: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmit = async event => {
    event.preventDefault()
    const {userid, pin} = this.state
    const userDetails = {user_id: userid, pin}
    const url = 'https://apis.ccbp.in/ebank/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {userid, pin, errorMsg, showErrorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-container">
        <div className="center-container">
          <div className="con-1">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
            />
          </div>
          <div className="con-2">
            <h1>Welcome Back!</h1>
            <form onSubmit={this.onSubmit}>
              <label htmlFor="userId">User ID</label>
              <br />
              <input
                type="text"
                id="userId"
                placeholder="Enter User ID"
                onChange={this.onChangeUserId}
                value={userid}
              />
              <br />
              <label htmlFor="pin">PIN</label>
              <br />
              <input
                type="password"
                placeholder="Enter PIN"
                value={pin}
                id="pin"
                onChange={this.onChangePin}
              />
              <br />
              <button type="submit" className="button">
                Login
              </button>
              {showErrorMsg && <p>{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
