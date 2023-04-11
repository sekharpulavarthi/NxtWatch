import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import SavedVideosContext from '../../context/SavedVideosContext'

import {
  LoginFormContainer,
  FormContainer,
  InputContainer,
  LoginButton,
  ErrorMessage,
  LabelElement,
  UserInputEl,
  PasswordInputEl,
  NxtWatchLogo,
  ShowPasswordInputElContainer,
  ShowPasswordInputEl,
  ShowPasswordTxt,
} from './styledComponents'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    passwordType: 'password',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password, passwordType} = this.state
    return (
      <>
        <LabelElement className="input-label" htmlFor="password">
          PASSWORD
        </LabelElement>
        <PasswordInputEl
          type={passwordType}
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <LabelElement className="input-label" htmlFor="username">
          USERNAME
        </LabelElement>
        <UserInputEl
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  onChangeShowPassword = () => {
    const {passwordType} = this.state

    if (passwordType === 'password') {
      this.setState({passwordType: 'text'})
    } else {
      this.setState({passwordType: 'password'})
    }
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <SavedVideosContext.Consumer>
        {value => {
          const {darkTheme} = value
          return (
            <LoginFormContainer darkTheme={darkTheme}>
              <FormContainer onSubmit={this.submitForm}>
                <NxtWatchLogo
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="light-theme"
                />
                <InputContainer className="input-container">
                  {this.renderUsernameField()}
                </InputContainer>
                <InputContainer className="input-container">
                  {this.renderPasswordField()}
                </InputContainer>
                <ShowPasswordInputElContainer>
                  <ShowPasswordInputEl
                    type="checkbox"
                    id="checkbox"
                    onChange={this.onChangeShowPassword}
                  />
                  <ShowPasswordTxt htmlFor="checkbox">
                    Show Password
                  </ShowPasswordTxt>
                </ShowPasswordInputElContainer>
                <LoginButton type="submit" className="login-button">
                  Login
                </LoginButton>
                {showSubmitError && (
                  <ErrorMessage className="error-message">
                    *{errorMsg}
                  </ErrorMessage>
                )}
              </FormContainer>
            </LoginFormContainer>
          )
        }}
      </SavedVideosContext.Consumer>
    )
  }
}

export default LoginForm
