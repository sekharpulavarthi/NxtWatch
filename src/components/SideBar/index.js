import {Link} from 'react-router-dom'
import SavedVideosContext from '../../context/SavedVideosContext'
import {
  SidebarContainer,
  SidebarUpperContainer,
  HomeContainer,
  HomeIcon,
  HomeText,
  TrendingContainer,
  TrendingIcon,
  TrendingText,
  GamingContainer,
  GamingIcon,
  GamingText,
  SavedVideosContainer,
  SavedVideosIcon,
  SavedVideosText,
  SidebarLowerContainer,
  ContactUsTxt,
  ContactUsIconsContainer,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  ParagraphTxt,
} from './styledComponents'

const Sidebar = () => (
  <SavedVideosContext.Consumer>
    {value => {
      const {darkTheme} = value
      return (
        <SidebarContainer darkTheme={darkTheme}>
          <SidebarUpperContainer>
            <Link to="/">
              <HomeContainer>
                <HomeIcon />
                <HomeText>Home</HomeText>
              </HomeContainer>
            </Link>
            <Link to="/trending">
              <TrendingContainer>
                <TrendingIcon />
                <TrendingText>Trending</TrendingText>
              </TrendingContainer>
            </Link>
            <Link to="/gaming">
              <GamingContainer>
                <GamingIcon />
                <GamingText>Gaming</GamingText>
              </GamingContainer>
            </Link>
            <Link to="/saved-videos">
              <SavedVideosContainer>
                <SavedVideosIcon />
                <SavedVideosText>Saved Videos</SavedVideosText>
              </SavedVideosContainer>
            </Link>
          </SidebarUpperContainer>
          <SidebarLowerContainer>
            <ContactUsTxt>CONTACT US</ContactUsTxt>
            <ContactUsIconsContainer>
              <FacebookIcon
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
              />
              <TwitterIcon
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
              />
              <LinkedinIcon
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
              />
            </ContactUsIconsContainer>
            <ParagraphTxt>
              Enjoy now to see your channels and recommendations!
            </ParagraphTxt>
          </SidebarLowerContainer>
        </SidebarContainer>
      )
    }}
  </SavedVideosContext.Consumer>
)

export default Sidebar
