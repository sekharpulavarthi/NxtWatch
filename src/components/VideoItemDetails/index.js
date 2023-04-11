import {Component} from 'react'
import ReactPlayer from 'react-player'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'
import Sidebar from '../SideBar'
import Header from '../Header'
import SavedVideosContext from '../../context/SavedVideosContext'

import {
  VideoItemDetailsRouteContainer,
  VideoItemDetailsContainer,
  VideoContentContainer,
  Title,
  ViewsContainer,
  VideoContentSubContainer,
  ViewsCount,
  PublishedAt,
  LikesDisLikesContainer,
  LikeContainer,
  LikeIcon,
  LikeTxt,
  DisLikeContainer,
  DisLikeIcon,
  DisLikeTxt,
  SaveContainer,
  SaveIcon,
  SaveTxt,
  HrUnderline,
  DescriptionContainer,
  Logo,
  DescriptionSubContainer,
  TitleContainer,
  TitleTxt,
  SubscribersTxt,
  DescriptionTxt,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    videoDetails: {},
    apiStatus: apiStatusConstants.initial,
    isPlaying: false,
    likeStatus: false,
    dislikeStatus: false,
    savedStatus: false,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  onChangeLikeStatus = () => {
    const {dislikeStatus} = this.state
    this.setState(prevState => ({likeStatus: !prevState.likeStatus}))
    if (dislikeStatus) {
      this.setState(prevState => ({dislikeStatus: !prevState.dislikeStatus}))
    }
  }

  onChangeDisLikeStatus = () => {
    const {likeStatus} = this.state
    this.setState(prevState => ({dislikeStatus: !prevState.dislikeStatus}))
    if (likeStatus) {
      this.setState(prevState => ({likeStatus: !prevState.likeStatus}))
    }
  }

  onClickPlay = () => {
    this.setState(prevState => ({isPlaying: !prevState.isPlaying}))
  }

  getFormattedData = data => ({
    name: data.channel.name,
    profileImageUrl: data.channel.profile_image_url,
    subscriberCount: data.channel.subscriber_count,
    description: data.description,
    id: data.id,
    publishedAt: data.published_at,
    price: data.price,
    thumbnailUrl: data.thumbnail_url,
    title: data.title,
    videoUrl: data.video_url,
    viewCount: data.view_count,
  })

  getVideoDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData.video_details)
      this.setState({
        apiStatus: apiStatusConstants.success,
        videoDetails: updatedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getVideoDetails()
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
      <p>
        We are having some trouble to complete your request. Please try again.
      </p>
    </>
  )

  renderVideoItemDetailsView = () => (
    <SavedVideosContext.Consumer>
      {value => {
        const {addVideoItem, darkTheme} = value
        const {
          videoDetails,
          likeStatus,
          dislikeStatus,
          savedStatus,
        } = this.state
        const {isPlaying} = this.state
        const savedTxt = savedStatus ? 'Saved' : 'Save'
        const {
          id,
          name,
          profileImageUrl,
          subscriberCount,
          description,
          publishedAt,
          title,
          videoUrl,
          viewCount,
          thumbnailUrl,
        } = videoDetails
        const publishedDate = formatDistanceToNow(new Date(publishedAt)).slice(
          -7,
        )

        const onChangeSavedStatus = () => {
          const savedVideoDetails = {
            videoUrl,
            name,
            title,
            subscriberCount,
            publishedDate,
            id,
            thumbnailUrl,
          }
          addVideoItem(savedVideoDetails)
          this.setState(prevState => ({savedStatus: !prevState.savedStatus}))
        }

        return (
          <VideoItemDetailsContainer darkTheme={darkTheme}>
            <ReactPlayer url={videoUrl} playing={isPlaying} />
            <VideoContentContainer>
              <Title>{title}</Title>
              <VideoContentSubContainer>
                <ViewsContainer>
                  <ViewsCount>{viewCount} views</ViewsCount>
                  <PublishedAt>{publishedDate} ago</PublishedAt>
                </ViewsContainer>
                <LikesDisLikesContainer>
                  <LikeContainer
                    onClick={this.onChangeLikeStatus}
                    type="button"
                  >
                    <LikeIcon likeStatus={likeStatus} />
                    <LikeTxt likeStatus={likeStatus}>Like</LikeTxt>
                  </LikeContainer>
                  <DisLikeContainer
                    onClick={this.onChangeDisLikeStatus}
                    type="button"
                  >
                    <DisLikeIcon dislikeStatus={dislikeStatus} />
                    <DisLikeTxt dislikeStatus={dislikeStatus}>
                      Dislike
                    </DisLikeTxt>
                  </DisLikeContainer>
                  <SaveContainer onClick={onChangeSavedStatus} type="button">
                    <SaveIcon savedStatus={savedStatus} />
                    <SaveTxt savedStatus={savedStatus}>{savedTxt}</SaveTxt>
                  </SaveContainer>
                </LikesDisLikesContainer>
              </VideoContentSubContainer>
            </VideoContentContainer>
            <HrUnderline />
            <DescriptionContainer>
              <Logo src={profileImageUrl} alt={name} />
              <DescriptionSubContainer>
                <TitleContainer>
                  <TitleTxt>{name}</TitleTxt>
                  <SubscribersTxt>{subscriberCount} subscribers</SubscribersTxt>
                </TitleContainer>
                <DescriptionTxt>{description}</DescriptionTxt>
              </DescriptionSubContainer>
            </DescriptionContainer>
          </VideoItemDetailsContainer>
        )
      }}
    </SavedVideosContext.Consumer>
  )

  renderVideoItemDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideoItemDetailsView()
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
      <>
        <Header />
        <VideoItemDetailsRouteContainer>
          <Sidebar />
          <div className="product-item-details-container">
            {this.renderVideoItemDetails()}
          </div>
        </VideoItemDetailsRouteContainer>
      </>
    )
  }
}

export default VideoItemDetails
