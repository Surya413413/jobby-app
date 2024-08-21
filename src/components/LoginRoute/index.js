import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    submitError: false,
    error: '',
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 20,
    })
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = error => {
    this.setState({submitError: true, error})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, option)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  renderUserFied = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="user" className="user-label">
          USERNAME
        </label>
        <input
          type="text"
          value={username}
          placeholder="username"
          id="user"
          className="userinput-style"
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPasswordFied = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="pass" className="user-label">
          PASSWORD
        </label>
        <input
          type="password"
          value={password}
          placeholder="password"
          id="pass"
          className="userinput-style"
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  render() {
    const {submitError, error} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="loginpage-container">
        <form className="login-box-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <div className="input-container"> {this.renderUserFied()}</div>
          <div className="input-container"> {this.renderPasswordFied()}</div>
          <div>
            {' '}
            <button type="submit" className="login-button">
              Login
            </button>
          </div>
          {submitError && <p className="error-masg">*{error}</p>}
        </form>
      </div>
    )
  }
}
export default LoginRoute
