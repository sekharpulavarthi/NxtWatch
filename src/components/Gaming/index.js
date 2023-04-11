import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import GamingVideoItem from '../GamingVideoItem'
import Header from '../Header'
import SavedVideosContext from '../../context/SavedVideosContext'
import {
  GamingContainer,
  GamingSubContainer,
  GameItemsContainer,
} from './styledComponents'
import Sidebar from '../SideBar'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videosData: [],
  }

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
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
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
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

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getGamingVideos()
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
      <GameItemsContainer>
        {videosData.map(eachItem => (
          <GamingVideoItem videoDetails={eachItem} key={eachItem.id} />
        ))}
      </GameItemsContainer>
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
          return (
            <>
              <Header darkTheme={darkTheme} />
              <GamingContainer darkTheme={darkTheme}>
                <Sidebar />
                <GamingSubContainer>
                  {this.renderAllVideos()}
                </GamingSubContainer>
              </GamingContainer>
            </>
          )
        }}
      </SavedVideosContext.Consumer>
    )
  }
}

export default Gaming
