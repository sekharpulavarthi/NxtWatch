import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import TrendingVideoItem from '../TrendingVideoItem'
import Header from '../Header'
import SavedVideosContext from '../../context/SavedVideosContext'
import {
  TrendingContainer,
  TrendingSubContainer,
  VideoItemsContainer,
} from './styledComponents'
import Sidebar from '../SideBar'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videosData: [],
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
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
      <VideoItemsContainer>
        {videosData.map(eachItem => (
          <TrendingVideoItem videoDetails={eachItem} key={eachItem.id} />
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
          return (
            <>
              <Header darkTheme={darkTheme} />
              <TrendingContainer darkTheme={darkTheme}>
                <Sidebar />
                <TrendingSubContainer>
                  {this.renderAllVideos()}
                </TrendingSubContainer>
              </TrendingContainer>
            </>
          )
        }}
      </SavedVideosContext.Consumer>
    )
  }
}

export default Trending
