import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'
import SavedVideosContext from '../../context/SavedVideosContext'
import {
  NavHeaderContainer,
  WebsiteLogo,
  BsMoonIcon,
  ProfileImg,
  LogoutBtn,
  HeaderRightContainer,
  ThemeButton,
} from './styledComponents'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <SavedVideosContext.Consumer>
      {value => {
        const {onChangeTheme, darkTheme} = value
        const onChangeThemeColor = () => {
          onChangeTheme()
        }
        return (
          <NavHeaderContainer darkTheme={darkTheme}>
            <div className="nav-bar-mobile-logo-container">
              <Link to="/">
                <WebsiteLogo
                  className="website-logo"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="website logo"
                />
              </Link>
            </div>

            <HeaderRightContainer className="nav-bar-large-container">
              <ThemeButton onClick={onChangeThemeColor}>
                <BsMoonIcon />
              </ThemeButton>
              <ProfileImg
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
              />

              <LogoutBtn type="button" onClick={onClickLogout}>
                Logout
              </LogoutBtn>
            </HeaderRightContainer>
          </NavHeaderContainer>
        )
      }}
    </SavedVideosContext.Consumer>
  )
}

export default withRouter(Header)
