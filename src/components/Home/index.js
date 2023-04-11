import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import HomeVideoItem from '../HomeVideoItem'
import Header from '../Header'
import SavedVideosContext from '../../context/SavedVideosContext'
import {
  WebsiteLogo,
  DescriptionTxt,
  GetItNowBtn,
  NxtWatchPopupContainer,
  HomeContainer,
  NxtWatchPopupUpperContainer,
  CloseButton,
  HomeSubContainer,
  SearchInputContainer,
  SearchInput,
  SearchIcon,
  VideoItemsContainer,
} from './styledComponents'
import Sidebar from '../SideBar'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    searchInput: '',
    showPopUpStatus: false,
    apiStatus: apiStatusConstants.initial,
    videosData: [],
  }

  componentDidMount() {
    this.getHomeVideos()
  }

  onClickClose = () => {
    this.setState(prevState => ({showPopUpStatus: !prevState.showPopUpStatus}))
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getHomeVideos()
    }
  }

  getHomeVideos = async () => {
    const {searchInput} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      this.setState({apiStatus: apiStatusConstants.success})
      const formattedData = data.videos.map(eachItem => ({
        id: eachItem.id,
        publishedAt: eachItem.published_at,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
        name: eachItem.channel.name,
        profileImageUrl: eachItem.channel.profile_image_url,
      }))
      this.setState({
        videosData: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <SearchInputContainer>
        <SearchInput
          value={searchInput}
          type="search"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onEnterSearchInput}
        />
        <SearchIcon />
      </SearchInputContainer>
    )
  }

  renderNxtWatchPopup = () => {
    const {showPopUpStatus} = this.state
    return (
      <NxtWatchPopupContainer showPopUpStatus={showPopUpStatus}>
        <NxtWatchPopupUpperContainer>
          <WebsiteLogo
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
          />
          <DescriptionTxt>
            Buy Nxt Watch Premium prepaid plans with UPI
          </DescriptionTxt>
          <GetItNowBtn>GET IT NOW</GetItNowBtn>
        </NxtWatchPopupUpperContainer>
        <CloseButton type="button" onClick={this.onClickClose}>
          X
        </CloseButton>
      </NxtWatchPopupContainer>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getHomeVideos()
  }

  renderFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
        alt="failure view"
        className="register-prime-image"
      />
      <button onClick={this.onClickRetry} type="button">
        Retry
      </button>
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble</p>
    </>
  )

  renderAllVideosView = () => {
    const {videosData} = this.state
    return (
      <VideoItemsContainer>
        {videosData.map(eachItem => (
          <HomeVideoItem videoDetails={eachItem} key={eachItem.id} />
        ))}
      </VideoItemsContainer>
    )
  }

  renderAllVideos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAllVideosView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <SavedVideosContext.Consumer>
        {value => {
          const {darkTheme} = value
          console.log(darkTheme)
          return (
            <>
              <Header darkTheme={darkTheme} />
              <HomeContainer darkTheme={darkTheme}>
                <Sidebar />
                <HomeSubContainer>
                  {this.renderNxtWatchPopup()}
                  {this.renderSearchInput()}
                  {this.renderAllVideos()}
                </HomeSubContainer>
              </HomeContainer>
            </>
          )
        }}
      </SavedVideosContext.Consumer>
    )
  }
}

export default Home
