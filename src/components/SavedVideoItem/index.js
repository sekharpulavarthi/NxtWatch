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

class SavedVideoItem extends Component {
  render() {
    const {savedVideoItemDetails} = this.props
    const {
      publishedDate,
      thumbnailUrl,
      title,
      subscriberCount,
      name,
      id,
    } = savedVideoItemDetails
    // console.log(publishedAt, thumbnailUrl, title, viewCount, name, id)
    return (
      <Link to={`/videos/${id}`}>
        <VideoItemContainer>
          <VideoThumbnail src={thumbnailUrl} alt={title} />
          <ProfileContainer>
            <VideoItemSubContainer>
              <Title>{title}</Title>
              <Name>{name}</Name>
              <ViewsCountPublishedContainer>
                <ViewsCount>{subscriberCount} views</ViewsCount>
                <PublishedAt>{publishedDate} ago</PublishedAt>
              </ViewsCountPublishedContainer>
            </VideoItemSubContainer>
          </ProfileContainer>
        </VideoItemContainer>
      </Link>
    )
  }
}

export default SavedVideoItem
