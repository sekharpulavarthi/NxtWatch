import {Component} from 'react'
import {Link} from 'react-router-dom'

import {
  VideoItemContainer,
  VideoThumbnail,
  ProfileContainer,
  ProfileImg,
  VideoItemSubContainer,
  Name,
  ViewsCount,
  PublishedAt,
  Title,
  ViewsCountPublishedContainer,
} from './styledComponents'

class HomeVideoItem extends Component {
  render() {
    const {videoDetails} = this.props
    const {
      publishedAt,
      thumbnailUrl,
      title,
      viewCount,
      name,
      profileImageUrl,
      id,
    } = videoDetails
    return (
      <Link to={`/videos/${id}`}>
        <VideoItemContainer>
          <VideoThumbnail src={thumbnailUrl} alt={title} />
          <ProfileContainer>
            <ProfileImg src={profileImageUrl} alt={name} />
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

export default HomeVideoItem
