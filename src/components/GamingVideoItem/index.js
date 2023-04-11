import {Component} from 'react'
import {Link} from 'react-router-dom'

import {
  VideoItemContainer,
  VideoThumbnail,
  ViewsCount,
  Title,
} from './styledComponents'

class GamingVideoItem extends Component {
  render() {
    const {videoDetails} = this.props
    const {thumbnailUrl, title, viewCount, id} = videoDetails
    return (
      <Link to={`/videos/${id}`}>
        <VideoItemContainer>
          <VideoThumbnail src={thumbnailUrl} alt={title} />
          <Title>{title}</Title>
          <ViewsCount>{viewCount}</ViewsCount>
        </VideoItemContainer>
      </Link>
    )
  }
}

export default GamingVideoItem
