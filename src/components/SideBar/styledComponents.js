import styled from 'styled-components'
import {AiFillHome, AiFillFire, AiFillSave} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid orange;
  height: 100vh;
  width: 20%;
  background-color: ${props => (props.darkTheme ? '#0f0f0f' : '#f9f9f9')};
`

export const SidebarUpperContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const HomeContainer = styled.div`
  display: flex;
  align-items: center;
`

export const HomeIcon = styled(AiFillHome)`
  width: 40px;
`

export const HomeText = styled.p`
  font-size: 17px;
`

export const TrendingContainer = styled.div`
  display: flex;
  align-items: center;
`

export const TrendingIcon = styled(AiFillFire)`
  width: 40px;
`

export const TrendingText = styled.p`
  font-size: 17px;
`

export const GamingContainer = styled.div`
  display: flex;
  align-items: center;
`

export const GamingIcon = styled(SiYoutubegaming)`
  width: 40px;
`

export const GamingText = styled.p`
  font-size: 17px;
`

export const SavedVideosContainer = styled.div`
  display: flex;
  align-items: center;
`

export const SavedVideosIcon = styled(AiFillSave)`
  width: 40px;
`

export const SavedVideosText = styled.p`
  font-size: 17px;
`

export const SidebarLowerContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const ContactUsTxt = styled.p`
  font-size: 22px;
`

export const ContactUsIconsContainer = styled.div`
  display: flex;
`

export const FacebookIcon = styled.img`
  width: 60px;
`

export const TwitterIcon = styled.img`
  width: 60px;
`

export const LinkedinIcon = styled.img`
  width: 60px;
`

export const ParagraphTxt = styled.p`
  font-size: 17px;
  font-weight: bold;
  font-style: Roboto;
`
