import {Component} from 'react'
import {Link} from 'react-router-dom'

import {
  VideoItemContainer,
  VideoThumbnail,
  ProfileContainer,
  VideoItemSubContainer,
  Name,
  ViewsCount,
  PublishedAt,
  Title,
  ViewsCountPublishedContainer,
} from './styledComponents'

class TrendingVideoItem extends Component {
  render() {
    const {videoDetails} = this.props
    const {publishedAt, thumbnailUrl, title, viewCount, name, id} = videoDetails
    return (
      <Link to={`/videos/${id}`}>
        <VideoItemContainer>
          <VideoThumbnail src={thumbnailUrl} alt={title} />
          <ProfileContainer>
            <VideoItemSubContainer>
              <Title>{title}</Title>
              <Name>{name}</Name>
              <ViewsCountPublishedContainer>
                <ViewsCount>{viewCount}</ViewsCount>
                <PublishedAt>{publishedAt}</PublishedAt>
              </ViewsCountPublishedContainer>
            </VideoItemSubContainer>
          </ProfileContainer>
        </VideoItemContainer>
      </Link>
    )
  }
}

export default TrendingVideoItem
