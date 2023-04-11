import styled from 'styled-components'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'

export const VideoItemDetailsRouteContainer = styled.div`
  display: flex;
`

export const VideoItemDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.darkTheme ? '#0f0f0f' : '#f9f9f9')};
`

export const VideoContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const VideoContentSubContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Title = styled.div`
  display: flex;
  margin-top: 5px;
`

export const ViewsContainer = styled.div`
  display: flex;
`

export const ViewsCount = styled.div`
  display: flex;
  margin-right: 10px;
`

export const PublishedAt = styled.div`
  display: flex;
`

export const LikesDisLikesContainer = styled.div`
  display: flex;
`

export const LikeContainer = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: 0px;
`

export const LikeIcon = styled(AiOutlineLike)`
  width: 40px;
  color: ${props => (props.likeStatus === true ? 'blue' : 'grey')};
`

export const LikeTxt = styled.p`
  font-size: 16px;
  color: ${props => (props.likeStatus === true ? 'blue' : 'grey')};
`

export const DisLikeContainer = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: 0px;
`

export const DisLikeIcon = styled(AiOutlineDislike)`
  width: 40px;
  color: ${props => (props.dislikeStatus === true ? 'blue' : 'grey')};
`

export const DisLikeTxt = styled.p`
  font-size: 16px;
  color: ${props => (props.dislikeStatus === true ? 'blue' : 'grey')};
`

export const SaveContainer = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: 0px;
`

export const SaveIcon = styled(MdPlaylistAdd)`
  width: 40px;
  color: ${props => (props.savedStatus === true ? 'blue' : 'grey')};
`

export const SaveTxt = styled.p`
  font-size: 16px;
  color: ${props => (props.savedStatus === true ? 'blue' : 'grey')};
`

export const HrUnderline = styled.hr`
  border: none;
  border-top: 2px solid black;
  margin: 0;
`

export const DescriptionContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border: 2px solid orange;
`

export const Logo = styled.img`
  width: 50px;
  height: 50px;
`

export const DescriptionSubContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
`

export const TitleTxt = styled.p`
  font-size: 18px;
  margin: 0px;
`

export const SubscribersTxt = styled.p`
  font-size: 16px;
  margin: 0px;
`

export const DescriptionTxt = styled.p`
  font-size: 16px;
`
